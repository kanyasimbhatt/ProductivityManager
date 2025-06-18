import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
    plugins: [
        react(),
        viteStaticCopy({
            targets: [
                {
                    src: 'public/manifest.json',
                    dest: '.',
                },
            ],
        }),
    ],
    build: {
        outDir: 'build',
        rollupOptions: {
            input: {
                main: './index.html',
                background: resolve(__dirname, './src/background.ts'),
            },
            output: {
                entryFileNames: '[name].js',
            },
        },
    },
})
