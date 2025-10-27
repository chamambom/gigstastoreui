import { defineStore } from "pinia";
import axios from "axios";

// --- INTERFACES ---
// These define what shape (structure) your data should have.

export interface PaymentMethod {
  id: string;
  brand?: string;
  last4?: string;
  exp_month?: number;
  exp_year?: number;
  type?: string;
}

export interface Plan {
  id?: string;
  name?: string;
  price?: number;
  currency?: string;
  services_used?: number;
  limit?: number;
  can_add_more?: boolean;
  _id?: string;
  plan_price?: number;
  stripe_price_id?: string;
  perks?: string[];
}

// Interface for Invoice Line Items (Used inside Invoice interface)
export interface InvoiceLine {
  description: string;
  amount: number;
  currency: string;
  // Add other necessary line item properties if you use them
}

export interface Invoice {
  id: string;
  amount_due: number;
  status: string;
  created: string;

  // 🛑 FIXES for Invoice (Error 1 & 2)
  number?: string; // (Error 1, line 41)
  currency?: string; // (Error 1, lines 62, 70)
  amount_paid?: number; // (Error 1, lines 65, 66, 67, Error 2, line 195)
  pdf_url?: string; // (Error 1, lines 92, 93)
  hosted_invoice_url?: string; // (Error 1, lines 104, 105)

  // Payment method can be a simple ID string or a complex object,
  // defining it as string allows for simplicity, but if the backend
  // sends an object, it needs its own interface (using string for now).
  payment_method?: string | PaymentMethod | null; // (Error 1, lines 76, 81, 84)

  // Use the nested InvoiceLine interface (Error 1, line 120, Error 2, line 131)
  lines?: {
    data: InvoiceLine[];
    has_more: boolean;
    object: 'list';
    url: string;
  };
}


interface StripeState {
  currentPlan: Plan;
  paymentMethods: PaymentMethod[]; // Holds saved payment methods
  hasPaymentMethod: boolean; // Indicates whether the user has a payment method
  defaultPaymentMethod: string | null; // Holds the default payment method
  successMessage: string; // Add success message state
  selectedPaymentMethod: string | null; // Add selected payment method state
  upgradeOptions: Plan[];  // Store upgrade options from backend
  downgradeOptions: Plan[]; // Store downgrade options from backend
  blockedDowngradeOptions: Plan[];
  invoices: Invoice[]; // Holds fetched invoices
  // hasInvoices: boolean; // Tracks if user has any invoices
}

// --- STORE DEFINITION ---
export const useStripeStore = defineStore("stripeStore", {
  state: (): StripeState => ({
    currentPlan: {},
    paymentMethods: [], // Holds saved payment methods
    hasPaymentMethod: false, // Indicates whether the user has a payment method
    defaultPaymentMethod: null, // Holds the default payment method
    successMessage: "", // Add success message state
    selectedPaymentMethod: null, // Add selected payment method state
    upgradeOptions: [],  // Store upgrade options from backend
    downgradeOptions: [], // Store downgrade options from backend
    blockedDowngradeOptions: [],
    invoices: [], // Holds fetched invoices
    // hasInvoices: false // Tracks if user has any invoices
  }),

  getters: {
    getCurrentPlan: (state) => state.currentPlan,
    getPaymentMethods: (state) => state.paymentMethods,
    getHasPaymentMethod: (state) => state.hasPaymentMethod,
    getDefaultPaymentMethod: (state) => state.defaultPaymentMethod,
    getSuccessMessage: (state) => state.successMessage, // Add getter for success message
    getSelectedPaymentMethod: (state) => state.selectedPaymentMethod, // Add getter for selected payment method
    getUpgradeOptions: (state) => state.upgradeOptions,
    getDowngradeOptions: (state) => state.downgradeOptions,
    getBlockedDowngradeOptions: (state) => state.blockedDowngradeOptions,
    getInvoices: (state) => state.invoices,
    // hasInvoices: (state) => state.hasInvoices
  },

  actions: {
    // Fetch user subscription & available upgrades/downgrades
    async fetchUserSubscription() {
      try {
        // Fetch both requests in parallel - Please do not delete this. My plan was to only call the user subscription upon logging without the extra data but decided against it. Maybe when I scale, who knows.
        // const [userResponse, optionsResponse] = await Promise.all([
        //     // axios.get("/api/v1/user/subscription"), // later on I will use this to call it only when I need the user subscription.
        //     axios.get("/api/v1/subscription-options")
        // ]);

        const optionsResponse = await axios.get("/api/v1/subscription-options");

        // Commit user subscription data
        this.currentPlan = optionsResponse.data.currentPlan || {};

        // Commit upgrade/downgrade options
        this.upgradeOptions = optionsResponse.data.upgradeOptions || [];
        this.downgradeOptions = optionsResponse.data.downgradeOptions || [];
        this.blockedDowngradeOptions = optionsResponse.data.blockedDowngradeOptions || [];

      } catch (error) {
        console.error("Error fetching subscription details:", error);
      }
    },

    // Fetch saved payment methods
    async fetchPaymentMethods() {
      try {
        const response = await axios.get("/api/v1/get-payment-method");
        if (response.data.has_payment_method) {
          this.paymentMethods = response.data.saved_payment_methods;
          this.defaultPaymentMethod = response.data.default_payment_method.id;
          this.hasPaymentMethod = true;
        } else {
          this.hasPaymentMethod = false;
        }
      } catch (error) {
        console.error("Error fetching payment methods:", error);
      }
    },

    // Fetch invoices from API
    async fetchInvoices(limit = 10) {
      try {
        const response = await axios.get("/api/v1/get-invoices", {
          params: { limit }
        });

        if (response.data.count > 0) {
          this.invoices = response.data.invoices;
          this.hasInvoices = true;
        } else {
          this.hasInvoices = false;
        }
      } catch (error) {
        console.error("Error fetching invoices:", error);
        // Optional: commit error to state if you want to display it
      }
    },

    // Save a new card - improved with better error handling and state management
    async saveNewCard({ payment_method_id }: { payment_method_id: string }) {
      if (this.paymentMethods.length >= 3) {
        throw new Error("You can only save up to 3 cards.");
      }

      try {
        const response = await axios.post("/api/v1/save-card", {
          payment_method_id,
        });

        // Refresh payment methods to get the updated list
        await this.fetchPaymentMethods();

        // Since the new card is automatically set as default, update the selected payment method
        this.selectedPaymentMethod = payment_method_id;

        // Set success message
        this.successMessage = response.data.message;

        return response.data.message;

      } catch (error: any) {
        console.error("Error saving card:", error);
        const errorMessage = error.response?.data?.detail || "Failed to save card.";

        this.successMessage = ""; // Reset success message
        throw new Error(errorMessage);
      }
    },

    // Upgrade subscription
    async upgradeSubscription({ priceId, paymentMethodId }: { priceId: string; paymentMethodId: string }) {
      if (!paymentMethodId) {
        throw new Error("Please select a payment method.");
      }

      try {
        const response = await axios.post("/api/v1/upgrade-subscription", {
          new_plan: priceId,
          payment_method_id: paymentMethodId,
        });

        this.successMessage = "Subscription upgraded successfully!";

        await this.fetchUserSubscription(); // Refresh subscription
      } catch (error: any) {
        console.error("Error upgrading subscription:", error);
        throw new Error(error.response?.data?.detail || "Failed to upgrade subscription.");
      }
    },

    // Downgrade subscription
    async downgradeSubscription({ priceId }: { priceId: string }) {
      try {
        const response = await axios.post("/api/v1/downgrade-subscription", {
          new_plan: priceId,
        });

        this.successMessage = "Subscription downgraded successfully!";
        await this.fetchUserSubscription(); // Refresh subscription
      } catch (error: any) {
        console.error("Error downgrading subscription:", error);
        throw new Error(error.response?.data?.detail || "Failed to downgrade subscription.");
      }
    },

    // Delete card
    async deleteCard(paymentMethodId: string) {
      try {
        await axios.delete(`/api/v1/delete-card/${paymentMethodId}`);
        await this.fetchPaymentMethods(); // Refresh payment methods
        this.successMessage = "Card deleted successfully!";
      } catch (error: any) {
        console.error("Error deleting card:", error);
        throw new Error(error.response?.data?.detail || "Failed to delete card.");
      }
    },

    // Set default card - kept as is for independent use
    async setDefaultCard(cardId: string) {
      try {
        const response = await axios.post("/api/v1/set-default-payment-method", {
          payment_method_id: cardId,
        });

        // Update selected payment method
        this.selectedPaymentMethod = cardId;
        // Set success message
        this.successMessage = "Default card updated successfully!";
        // Optionally refresh payment methods to ensure UI is in sync
        await this.fetchPaymentMethods();
        return response.data.message;

      } catch (error: any) {
        console.error("Error setting default card:", error);
        const errorMessage = error.response?.data?.detail || "Failed to set default card. Please try again.";
        throw new Error(errorMessage);
      }
    },
  }
});
