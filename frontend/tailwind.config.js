/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                background: '#0d0d12',
                card: '#16161e',
                primary: '#6b4cff',
                secondary: '#00f0ff',
                accent: '#ff0055',
                muted: '#808092'
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Outfit', 'sans-serif']
            }
        },
    },
    plugins: [],
}
