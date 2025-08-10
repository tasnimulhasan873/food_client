import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'custom': {
                    'text': '#5C6574',
                    'background': '#F4F1EA',
                    'primary': '#ffb300',
                    'secondary': '#01101e',
                    'accent': '#c5a91b',
                }
            }
        },
    },
    plugins: [
        daisyui,
    ],
    darkMode: "class",
    daisyui: {
        themes: [
            {
                mytheme: {
                    "primary": "#ffb300",
                    "secondary": "#01101e",
                    "accent": "#c5a91b",
                    "neutral": "#01101e",
                    "base-100": "#f4f1ea",
                    "base-200": "#e5e7eb",
                    "base-300": "#d1d5db",
                    "info": "#3abff8",
                    "success": "#36d399",
                    "warning": "#fbbd23",
                    "error": "#f87272",
                },
                mythemeDark: {
                    "primary": "#ffb300",
                    "secondary": "#01101e",
                    "accent": "#c5a91b",
                    "neutral": "#18181b",
                    "base-100": "#18181b",
                    "base-200": "#23232a",
                    "base-300": "#2d2d36",
                    "info": "#3abff8",
                    "success": "#36d399",
                    "warning": "#fbbd23",
                    "error": "#f87272",
                },
            },
        ],
    },
}
