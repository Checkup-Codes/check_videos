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
            "light",
            "dark",
            {
                'neon-light': {
                    primary: "#00ffff", /* cyan */
                    secondary: "#ff00ff", /* magenta */
                    accent: "#00ff00", /* lime */
                    neutral: "#e5e5e5", /* açık gri */
                    "base-100": "#ffffff", /* beyaz */
                    info: "#00ffff",
                    success: "#00ff00",
                    warning: "#ffff00",
                    error: "#ff0000",
                }
            },
            {
                'neon-dark': {
                    primary: "#00ffff", /* cyan */
                    secondary: "#ff00ff", /* magenta */
                    accent: "#00ff00", /* lime */
                    neutral: "#1a1a1a", /* koyu gri */
                    "base-100": "#0d0d0d", /* neredeyse siyah */
                    info: "#00ffff",
                    success: "#00ff00",
                    warning: "#ffff00",
                    error: "#ff0000",
                }
            },
            {
                'lotr-light': {
                    primary: "#d4af37", /* altın sarısı */
                    secondary: "#8b4513", /* kahverengi */
                    accent: "#ffd700", /* parlak altın */
                    neutral: "#2d1810", /* koyu kahve */
                    "base-100": "#f5f5dc", /* açık bej */
                    info: "#3ABFF8",
                    success: "#36D399",
                    warning: "#FBBD23",
                    error: "#F87272",
                }
            },
            {
                'lotr-dark': {
                    primary: "#ffd700", /* parlak altın */
                    secondary: "#d4af37", /* altın sarısı */
                    accent: "#8b4513", /* kahverengi */
                    neutral: "#2d1810", /* koyu kahve */
                    "base-100": "#1a0f0a", /* çok koyu kahve */
                    info: "#3ABFF8",
                    success: "#36D399",
                    warning: "#FBBD23",
                    error: "#F87272",
                }
            },
            {
                'cyberpunk-light': {
                    primary: "#ff0000", /* kırmızı */
                    secondary: "#ffff00", /* sarı */
                    accent: "#0000ff", /* mavi */
                    neutral: "#d9d9d9", /* açık gri */
                    "base-100": "#ffffff", /* beyaz */
                    info: "#00ffff",
                    success: "#00ff00",
                    warning: "#ffff00",
                    error: "#ff0000",
                }
            },
            {
                'cyberpunk-dark': {
                    primary: "#ff0000", /* kırmızı */
                    secondary: "#ffff00", /* sarı */
                    accent: "#0000ff", /* mavi */
                    neutral: "#262626", /* koyu gri */
                    "base-100": "#141414", /* çok koyu */
                    info: "#00ffff",
                    success: "#00ff00",
                    warning: "#ffff00",
                    error: "#ff0000",
                }
            },
            {
                'nature-light': {
                    primary: "#22c55e", /* yeşil */
                    secondary: "#f97316", /* turuncu */
                    accent: "#eab308", /* sarı */
                    neutral: "#365314", /* koyu yeşil */
                    "base-100": "#f0fdf4", /* açık yeşil */
                    info: "#3ABFF8",
                    success: "#22c55e",
                    warning: "#f97316",
                    error: "#ef4444",
                }
            },
            {
                'nature-dark': {
                    primary: "#22c55e", /* yeşil */
                    secondary: "#f97316", /* turuncu */
                    accent: "#eab308", /* sarı */
                    neutral: "#365314", /* koyu yeşil */
                    "base-100": "#0a1f0a", /* çok koyu yeşil */
                    info: "#3ABFF8",
                    success: "#22c55e",
                    warning: "#f97316",
                    error: "#ef4444",
                }
            },
            {
                'ocean-light': {
                    primary: "#3b82f6", /* mavi */
                    secondary: "#06b6d4", /* turkuaz */
                    accent: "#1d4ed8", /* koyu mavi */
                    neutral: "#1e3a8a", /* çok koyu mavi */
                    "base-100": "#f0f9ff", /* açık mavi */
                    info: "#3b82f6",
                    success: "#06b6d4",
                    warning: "#f59e0b",
                    error: "#ef4444",
                }
            },
            {
                'ocean-dark': {
                    primary: "#3b82f6", /* mavi */
                    secondary: "#06b6d4", /* turkuaz */
                    accent: "#1d4ed8", /* koyu mavi */
                    neutral: "#1e3a8a", /* çok koyu mavi */
                    "base-100": "#0a0f1a", /* çok koyu mavi */
                    info: "#3b82f6",
                    success: "#06b6d4",
                    warning: "#f59e0b",
                    error: "#ef4444",
                }
            },
            {
                'sunset-light': {
                    primary: "#fb923c", /* turuncu */
                    secondary: "#ec4899", /* pembe */
                    accent: "#fbbf24", /* sarı */
                    neutral: "#9a3412", /* koyu turuncu */
                    "base-100": "#fff7ed", /* açık turuncu */
                    info: "#fb923c",
                    success: "#fbbf24",
                    warning: "#ec4899",
                    error: "#ef4444",
                }
            },
            {
                'sunset-dark': {
                    primary: "#fb923c", /* turuncu */
                    secondary: "#ec4899", /* pembe */
                    accent: "#fbbf24", /* sarı */
                    neutral: "#9a3412", /* koyu turuncu */
                    "base-100": "#1a0f0a", /* çok koyu turuncu */
                    info: "#fb923c",
                    success: "#fbbf24",
                    warning: "#ec4899",
                    error: "#ef4444",
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
