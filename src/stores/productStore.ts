import {defineStore} from 'pinia'
import axios from 'axios'

export type ProductStatus = 'draft' | 'published' | 'archived';
export type Interval = 'day' | 'week' | 'month' | 'year' | null;


export interface MediaFile {
    url: string
    object_key: string
    file_type: 'image' | 'video'
    size: number
    uploaded_at: string
}

export interface SellerInfo {
    _id: string
    tradingName: string
    address?: {
        city?: string
        locality?: string
    }
    overallProviderRating?: number | null
    totalProviderReviews?: number | null
}

export interface Product {
    _id: string
    seller_id: string
    title: string
    description: string
    price: number
    category: string
    stock: number
    status: ProductStatus
    stripe_product_id?: string
    stripe_price_id?: string
    is_recurring?: boolean
    interval?: Interval
    media: MediaFile[]
    seller?: SellerInfo
    created_at: string
    updated_at: string
}


interface ProductsState {
    items: Record<string, Product>
    ids: string[]
    loading: boolean
    error: string | null
    userProducts: string[]
    userProductsLoading: boolean
    filter: {
        category?: string
        skip: number
        limit: number
    }
}

export const useProductStore = defineStore('products', {
    state: (): ProductsState => ({
        items: {},
        ids: [],
        loading: false,
        error: null,
        userProducts: [],
        userProductsLoading: false,
        filter: {
            skip: 0,
            limit: 20,
        },
    }),

    getters: {
        list(): Product[] {
            return this.ids.map(id => this.items[id])
                .filter((p): p is Product => p !== undefined)
        },

        loaded(): boolean {
            return this.ids.length > 0
        },

        getProductById: (state) => (id: string): Product | undefined => {
            return state.items[id]
        },

        userProductsList(): Product[] {
            return this.userProducts
                .map(id => this.items[id])
                .filter((p): p is Product => p !== undefined)
        },

        byCategory: (state) => (category: string): Product[] => {
            return state.ids
                // 1. Map IDs to items (Result: (Product | undefined)[])
                .map(id => state.items[id])
                // 2. Filter out undefined values (Result: Product[])
                .filter((p): p is Product => !!p)
                // 3. Now you can safely filter by category
                .filter(p => p.category === category)
        },
    },

    actions: {
        async fetchAll(category?: string) {
            this.loading = true
            this.error = null

            try {
                const params: Record<string, any> = {
                    skip: this.filter.skip,
                    limit: this.filter.limit,
                }

                if (category) {
                    params.category = category
                }

                // Use global axios - it already has baseURL and interceptors from main.ts
                const {data} = await axios.get<Product[]>('/api/v1/products', {params})

                // Store products
                this.ids = data.map((product) => {
                    this.items[product._id] = product
                    return product._id
                })
            } catch (err) {
                this.error = axios.isAxiosError(err)
                    ? err.response?.data?.detail || err.message
                    : 'Failed to fetch products'
                console.error('Failed to fetch products:', err)
            } finally {
                this.loading = false
            }
        },

        async fetchUserProducts() {
            this.userProductsLoading = true
            this.error = null

            try {
                const {data} = await axios.get<Product[]>('/api/v1/products/user/my-products')

                // Store user products
                this.userProducts = data.map((product) => {
                    this.items[product._id] = product
                    return product._id
                })
            } catch (err) {
                this.error = axios.isAxiosError(err)
                    ? err.response?.data?.detail || err.message
                    : 'Failed to fetch your products'
                console.error('Failed to fetch user products:', err)
            } finally {
                this.userProductsLoading = false
            }
        },

        async createProduct(productData: Omit<Product, '_id' | 'seller_id' | 'created_at' | 'updated_at'>) {
            this.loading = true
            this.error = null

            try {
                const {data} = await axios.post<Product>('/api/v1/products', productData)
                this.items[data._id] = data
                this.userProducts.push(data._id)
                return data
            } catch (err) {
                this.error = axios.isAxiosError(err)
                    ? err.response?.data?.detail || err.message
                    : 'Failed to create product'
                throw err
            } finally {
                this.loading = false
            }
        },

        async updateProduct(productId: string, updateData: Partial<Product>) {
            this.loading = true
            this.error = null

            try {
                const {data} = await axios.patch<Product>(`/api/v1/products/${productId}`, updateData)
                this.items[data._id] = data
                return data
            } catch (err) {
                this.error = axios.isAxiosError(err)
                    ? err.response?.data?.detail || err.message
                    : 'Failed to update product'
                throw err
            } finally {
                this.loading = false
            }
        },

        async deleteProduct(productId: string) {
            this.loading = true
            this.error = null

            try {
                await axios.delete(`/api/v1/products/${productId}`)

                // Remove from store
                delete this.items[productId]
                this.ids = this.ids.filter(id => id !== productId)
                this.userProducts = this.userProducts.filter(id => id !== productId)
            } catch (err) {
                this.error = axios.isAxiosError(err)
                    ? err.response?.data?.detail || err.message
                    : 'Failed to delete product'
                throw err
            } finally {
                this.loading = false
            }
        },

        async publishProduct(productId: string) {
            return this.updateProduct(productId, {status: 'published'} as any)
        },

        async archiveProduct(productId: string) {
            return this.updateProduct(productId, {status: 'archived'} as any)
        },

        // NEW: Action to perform the direct PUT request to R2
        async uploadFileToR2(url: string, file: File) {
            try {
                // Use fetch for direct PUT operations to S3/R2
                const response = await fetch(url, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': file.type, // ESSENTIAL for R2
                    },
                    body: file,
                });

                if (!response.ok) {
                    throw new Error(`R2 Upload failed with status: ${response.status}`);
                }
            } catch (error) {
                console.error("Direct R2 Upload failed:", error);
                throw new Error("Failed to upload image file to cloud storage.");
            }
        },

        // UPDATED: Action to request the pre-signed URL
        async requestUploadUrl(productId: string, file: File) {
            try {
                const {data} = await axios.post(
                    `/api/v1/product/${productId}/media/upload-request`,
                    null,
                    {
                        params: {
                            file_name: file.name,
                            file_type: file.type.startsWith('image/') ? 'image' : 'video',
                            file_size: file.size,
                            content_type: file.type,
                        },
                    }
                );
                return data; // Returns { uploadUrl, objectKey, fileType, fileSize }
            } catch (error) {
                console.error("Error requesting upload URL:", error);
                throw error;
            }
        },

        // UPDATED: Action to confirm upload and update the DB/state
        async confirmUpload(productId: string, objectKey: string, fileType: string, fileSize: number) {
            this.loading = true;
            this.error = null;
            try {
                const {data} = await axios.post<Product>(
                    `/api/v1/product/${productId}/media/confirm`,
                    {
                        object_key: objectKey,
                        file_type: fileType,
                        file_size: fileSize,
                    }
                );
                // Update product in the local store state with the confirmed media array
                this.items[data._id] = data;
                return data;
            } catch (error) {
                this.error = axios.isAxiosError(error)
                    ? error.response?.data?.detail || error.message
                    : 'Failed to confirm upload'
                throw error;
            } finally {
                this.loading = false;
            }
        },

        // UPDATED: Action to delete media from R2 and DB
        async deleteProductMedia(productId: string, objectKey: string) {
            this.loading = true;
            this.error = null;
            try {
                await axios.delete(
                    `/api/v1/product/${productId}/media`,
                    {
                        params: {
                            object_key: objectKey
                        }
                    }
                );

                // Update the state locally immediately
                const product = this.items[productId];
                if (product) {
                    const updatedMedia = product.media.filter(m => m.object_key !== objectKey);

                    // Also update the primary 'image' field if the deleted file was the primary one
                    const deletedUrl = product.media.find(m => m.object_key === objectKey)?.url;

                    let newPrimaryImageUrl = product.media?.[0]?.url || '';


                    // If the deleted image was the primary one (i.e., its URL matched the main image URL)
                    if (newPrimaryImageUrl === deletedUrl) {
                        // Set new primary image to the first remaining image, or empty string
                        newPrimaryImageUrl = updatedMedia.length > 0 ? updatedMedia[0]!.url : '';
                    }

                    // Deep merge update for reactivity
                    this.items[productId] = {
                        ...product,
                        media: updatedMedia,
                    };
                }
            } catch (error) {
                this.error = axios.isAxiosError(error)
                    ? error.response?.data?.detail || error.message
                    : 'Failed to delete media'
                throw error;
            } finally {
                this.loading = false;
            }
        },

        clearError() {
            this.error = null
        },
    },
})