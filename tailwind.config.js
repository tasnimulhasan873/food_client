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
    daisyui: {
        themes: [
            {
                mytheme: {
                    "primary": "#ffb300",
                    "secondary": "#01101e",
                    "accent": "#c5a91b",
                    "neutral": "#01101e",
                    "base-100": "#01101e",
                    "base-200": "#0a1929",
                    "base-300": "#132030",
                    "info": "#3abff8",
                    "success": "#36d399",
                    "warning": "#fbbd23",
                    "error": "#f87272",
                },
            },
        ],
    },
}
