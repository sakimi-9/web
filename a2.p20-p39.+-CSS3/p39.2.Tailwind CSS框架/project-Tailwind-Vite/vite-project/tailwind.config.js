/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    darkMode: 'class', // 确保使用 class 策略
    theme: {
        extend: {},
    },
    plugins: [],
} 