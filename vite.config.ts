import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import pkg from './package.json' assert { type: 'json' }

export default defineConfig({
    root: 'src',
    resolve: {
        alias: {
            '@common': path.resolve(__dirname, 'src/common'),
            '@widget': path.resolve(__dirname, 'src/widget'),
            '@pkg': path.resolve(__dirname, 'src/pkg'),
        },
    },
    plugins: [
        dts(),
        react()
    ],
    build: {
        sourcemap: true,
        lib: {
            entry: [
                path.resolve(__dirname, 'src/pkg/index'),
                path.resolve(__dirname, 'src/pkg/utils/utils'),
                path.resolve(__dirname, 'src/pkg/broadcast/broadcast'),
            ],
            fileName: (formats, entryName) => `pkg/${entryName}/${entryName}.${formats}.js`,
        },
        rollupOptions: {
            external: ['react'],
            output: {
                globals: {
                    react: 'React',
                },
            },
        },
        outDir: path.resolve(__dirname, 'dist'),
    },
    server: {
        host: '0.0.0.0',
        port: 3000
    },
})
