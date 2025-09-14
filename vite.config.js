import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

import {fileURLToPath} from 'url'
import {dirname, resolve} from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
    plugins: [
        vue(),
        tailwindcss(),
    ],
    server: {
        port: 80,
    },
    optimizeDeps: {
        include: [
            // 'leaflet',
            // 'leaflet.awesome-markers',
            // 'leaflet.markercluster'
        ]
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
            '@assets': resolve(__dirname, './src/assets')
        }
    }
})