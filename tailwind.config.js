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
                sans: ['var(--font-family)', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                'theme': {
                    primary: 'var(--color-primary)',
                    secondary: 'var(--color-secondary)',
                    accent: 'var(--color-accent)',
                    background: 'var(--color-background)',
                    text: 'var(--color-text)',
                    'text-light': 'var(--color-text-light)',
                    'text-dark': 'var(--color-text-dark)',
                },
                'primary': {
                    50: 'var(--color-primary-50)',
                    100: 'var(--color-primary-100)',
                    200: 'var(--color-primary-200)',
                    300: 'var(--color-primary-300)',
                    400: 'var(--color-primary-400)',
                    500: 'var(--color-primary-500)',
                    600: 'var(--color-primary-600)',
                    700: 'var(--color-primary-700)',
                    800: 'var(--color-primary-800)',
                    900: 'var(--color-primary-900)',
                },
                'sidebar': {
                    light: 'var(--color-sidebar-light)',
                    DEFAULT: 'var(--color-sidebar)',
                    dark: 'var(--color-sidebar-dark)',
                },
                'accent': {
                    light: 'var(--color-accent-light)',
                    DEFAULT: 'var(--color-accent)',
                    dark: 'var(--color-accent-dark)',
                },
                'screen': {
                    light: 'var(--color-screen-light)',
                    DEFAULT: 'var(--color-screen)',
                    dark: 'var(--color-screen-dark)',
                },
                'neutral': {
                    50: 'var(--color-neutral-50)',
                    100: 'var(--color-neutral-100)',
                    200: 'var(--color-neutral-200)',
                    300: 'var(--color-neutral-300)',
                    400: 'var(--color-neutral-400)',
                    500: 'var(--color-neutral-500)',
                    600: 'var(--color-neutral-600)',
                    700: 'var(--color-neutral-700)',
                    800: 'var(--color-neutral-800)',
                    900: 'var(--color-neutral-900)',
                },
            },
            borderColor: {
                'theme': {
                    light: 'var(--color-border-light)',
                    dark: 'var(--color-border-dark)',
                }
            },
            borderWidth: {
                'theme': 'var(--border-width)',
            },
            borderRadius: {
                'theme': 'var(--border-radius)',
            },
            backgroundImage: {
                'theme-pattern': 'var(--background-image)',
            },
            gridTemplateColumns: {
                'subsidebar': '1fr 2fr',
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
                'screen-minus-10': 'calc(100vh - 2.5rem)',
              },
        },
    },

    plugins: [forms],
};
