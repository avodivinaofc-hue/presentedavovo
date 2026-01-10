/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'authentic-black': '#0B0B0F',
                'authentic-purple': '#2A0E3F',
                'authentic-gold': '#C9A44C',
                'authentic-text': '#F3EFE8',
                'authentic-gray': '#B6B1A9',
            },
            fontFamily: {
                serif: ['Playfair Display', 'serif'],
                sans: ['Inter', 'sans-serif'],
            },
            backgroundImage: {
                'ritual-gradient': 'radial-gradient(circle at center, rgba(42, 14, 63, 0.4) 0%, rgba(11, 11, 15, 0) 70%)',
            }
        },
    },
    plugins: [],
}
