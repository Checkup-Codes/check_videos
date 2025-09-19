import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';
import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
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
                sans: ['Geist Sans', ...defaultTheme.fontFamily.sans],
            },
            gridTemplateColumns: {
                'subsidebar': 'minmax(0, 320px) 1fr',
                'subsidebar-narrow': 'minmax(0, 150px) 1fr',
                'sidebar': '2fr 10fr',
            },
            boxShadow: {
                'right': '10px 0 10px -3px rgba(0, 0, 0, 0.1)',
                'subtle': '0 2px 4px rgba(0, 0, 0, 0.05)',
                'medium': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            },
            screens: {
                '2xl': '1536px',
                '3xl': '1920px',
                '4xl': '2560px',
                '5xl': '3200px',
            },
            height: {
                'screen-minus': 'calc(100vh)',
                'screen-minus-1': 'calc(100vh - 0.02rem)',
                'screen-minus-4': 'calc(100vh - 1rem)',
                'screen-minus-10': 'calc(100vh - 2.5rem)',
                'screen-minus-12': 'calc(100vh - 3rem)',
                'screen-minus-16': 'calc(100vh - 4rem)',
                'screen-minus-17': 'calc(100vh - 4.01rem)',
                'screen-minus-18': 'calc(100vh - 4.5rem)',
                'screen-minus-20': 'calc(100vh - 5rem)',
                'screen-minus-28': 'calc(100vh - 7rem)',
              },
        },
    },

    plugins: [forms, daisyui],
    daisyui: {
        themes: [
            {
                'light': {
                    primary: "#333333", /* koyu gri */
                    secondary: "#666666", /* orta gri */
                    accent: "#999999", /* açık gri */
                    neutral: "#4d4d4d", /* koyu gri */
                    "base-100": "#ffffff", /* saf beyaz */
                    "base-200": "#fafafa", /* çok açık gri */
                    "base-300": "#f0f0f0", /* açık gri */
                    "base-content": "#333333", /* koyu gri */
                    info: "#666666",
                    success: "#4d4d4d",
                    warning: "#666666",
                    error: "#333333",
                }
            },
            {
                'dark': {
                    primary: "#e5e5e5", /* açık gri */
                    secondary: "#b3b3b3", /* orta gri */
                    accent: "#808080", /* koyu gri */
                    neutral: "#cccccc", /* açık gri */
                    "base-100": "#0a0a0a", /* çok koyu gri */
                    "base-200": "#1a1a1a", /* koyu gri */
                    "base-300": "#2a2a2a", /* orta koyu gri */
                    "base-content": "#e5e5e5", /* açık gri */
                    info: "#b3b3b3",
                    success: "#cccccc",
                    warning: "#b3b3b3",
                    error: "#e5e5e5",
                }
            },
            {
                'lotr-light': {
                    primary: "#d4af37", /* altın sarısı */
                    secondary: "#8b4513", /* kahverengi */
                    accent: "#ffd700", /* parlak altın */
                    neutral: "#2d1810", /* koyu kahve */
                    "base-100": "#f5f5dc", /* açık bej */
                    "base-200": "#f0f0e6", /* çok açık bej */
                    "base-300": "#e6e6d1", /* açık bej */
                    "base-content": "#2d1810", /* koyu kahve */
                    info: "#d4af37",
                    success: "#8b4513",
                    warning: "#ffd700",
                    error: "#8b4513",
                }
            },
            {
                'lotr-dark': {
                    primary: "#ffd700", /* parlak altın */
                    secondary: "#d4af37", /* altın sarısı */
                    accent: "#8b4513", /* kahverengi */
                    neutral: "#2d1810", /* koyu kahve */
                    "base-100": "#1a0f0a", /* çok koyu kahve */
                    "base-200": "#2a1f1a", /* koyu kahve */
                    "base-300": "#3a2f2a", /* orta koyu kahve */
                    "base-content": "#ffd700", /* parlak altın */
                    info: "#ffd700",
                    success: "#d4af37",
                    warning: "#8b4513",
                    error: "#d4af37",
                }
            }
        ],
        darkTheme: "dark",
        base: true,
        styled: true,
        utils: true,
        prefix: "",
        logs: false,
    },
};
