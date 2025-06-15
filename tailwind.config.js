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
                'subsidebar': 'minmax(0, 380px) 1fr',
                'subsidebar-narrow': 'minmax(0, 180px) 1fr',
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
            "light", 
            "dark",
            {
                nature: {
                    primary: "#2ecc71",
                    secondary: "#27ae60",
                    accent: "#3498db",
                    neutral: "#191D24",
                    "base-100": "#f0f8f1",
                    info: "#3ABFF8",
                    success: "#36D399",
                    warning: "#FBBD23",
                    error: "#F87272",
                },
                ocean: {
                    primary: "#1abc9c",
                    secondary: "#3498db",
                    accent: "#9b59b6",
                    neutral: "#2c3e50",
                    "base-100": "#ecf0f1",
                    info: "#3ABFF8",
                    success: "#36D399",
                    warning: "#FBBD23",
                    error: "#F87272",
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
