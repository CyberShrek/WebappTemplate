import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import sveltePreprocess from 'svelte-preprocess'

const contextRoot = '/template'

export default defineConfig({
    plugins: [svelte({
            preprocess: sveltePreprocess()
        }
    )],
    build: {
        outDir: '../webapp',
        emptyOutDir: true,
        rollupOptions: {
            input: {
                index: 'index.html',
                about: 'about.html'
            }
        }
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                rewrite: (path) => path.replace(/^\/api/, `${contextRoot}/api`),
                changeOrigin: true
            },
            '/servicebank': {
                target: 'http://localhost:8080',
                changeOrigin: true
            }
        }
    },
    base: contextRoot
})