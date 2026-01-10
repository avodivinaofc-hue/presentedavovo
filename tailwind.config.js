/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'void': '#0a050e',
                'void-light': '#150d1a',
                'gold': '#d4af37',
                'gold-light': '#e8c868',
                'parchment': '#eaddcf',
                'mystic': '#9d4edd',
            },
            fontFamily: {
                'serif': ['Cinzel', 'serif'],
                'sans': ['Lato', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
