import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.vue',
        './resources/**/*.blade.php',
        './resources/**/*.js',
        './resources/**/*.vue',
    ],
    
    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                'sidebar': '#fafafa',
                'subsidebar-shadow': 'rgb(0,180,216,0.7)',
                'screen-bg': '#FBFEFE',
            },
            gridTemplateColumns: {
                'subsidebar': '1fr 2fr',
                'sidebar': '2fr 10fr',
            },
            boxShadow: {
                'right': '10px 0 10px -3px rgba(0, 0, 0, 0.1)', // Sağa gölge
            }
        },
    },

    plugins: [forms],
};
