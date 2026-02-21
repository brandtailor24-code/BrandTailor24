/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#0f392b',
                    light: '#1a5c45',
                },
                secondary: {
                    DEFAULT: '#d4af37',
                    light: '#eac159',
                },
                brand: {
                    dark: '#0f392b',
                    gold: '#d4af37',
                }
            },
            fontFamily: {
                sans: ['Outfit', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
