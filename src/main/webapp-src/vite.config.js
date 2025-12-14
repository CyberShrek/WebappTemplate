import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import sveltePreprocess from 'svelte-preprocess'

export default defineConfig({
    plugins: [svelte({
            preprocess: sveltePreprocess()
        }
    )],
    build: {
        outDir: '../webapp',
        emptyOutDir: true
    },
    server: {
        proxy: {
            '/api': 'http://localhost:8080'
        }
    },
    base: '/template'
})