import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
            }
        },
        target: [
            'es2015',
            'chrome87',
            'edge88',
            'firefox78',
            'safari13'
        ],
        // don't minify for debug builds
        minify: !process.env.DEBUG ? 'esbuild' : false,
        // produce sourcemaps for debug builds
        sourcemap: !!process.env.DEBUG,
    },
    base: './'
});
