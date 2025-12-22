/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#2E4F3E',
                primaryText: '#1A1B1B',
                secondaryText: '#7B7B7B',
                textBlack: '#1A1B1B',
                shadeColor: '#F9F0EC',
                overlay: '#F6F7F8',
                bg: '#FFF4E9',
            },
        },
    },
    plugins: [],
};
