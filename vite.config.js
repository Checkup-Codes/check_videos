import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig(({ ssrBuild }) => {
    const config = {
        server: {
            host: true,
            port: 5173,
        },
        plugins: [
            laravel({
                input: ['resources/css/app.css', 'resources/js/app.ts'],
                refresh: true,
            }),
            vue({
                template: {
                    transformAssetUrls: {
                        base: null,
                        includeAbsolute: false,
                    },
                },
            }),
        ],
        resolve: {
            alias: {
                ziggy: path.resolve('vendor/tightenco/ziggy/dist/vue.es.js'),
            },
        },
    };

    if (!ssrBuild) {
        config.define = {
            'process.env': {},
        };
    }

    return config;
});
