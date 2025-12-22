/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#2E4F3E',
                primaryText: '#808080',
                secondaryText: '#7B7B7B',
                textBlack: '#272728',
                shadeColor: '#F9F0EC',
                overlay: '#F6F7F8',
                bg: '#FFF4E9',
            },
        },
    },
    plugins: [],
};
