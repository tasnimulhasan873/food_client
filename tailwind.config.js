import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [
        daisyui,
    ],
    darkMode: "class",
    daisyui: {
        themes: [
            {
                mytheme: {
                    "primary": "#ffb300", // yellow/orange
                    "secondary": "#01101e", // dark blue/black
                    "accent": "#c5a91b", // yellow-green
                    "base-100": "#f4f1ea", // light background
                },
                mythemeDark: {
                    "primary": "#ffb300",
                    "secondary": "#01101e",
                    "accent": "#c5a91b",
                    "base-100": "#18181b", // dark background
                },
            },
        ],
    },
}
