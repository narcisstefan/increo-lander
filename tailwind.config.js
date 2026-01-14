/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{html,ts}",
    ],
    theme: {
        extend: {
            colors: {
                "primary": "#cf1717",
                "primary-dark": "#a81212",
                "background-light": "#ffffff",
                "background-dark": "#181111",
                "surface-light": "#f4f4f5",
                "surface-dark": "#262626",
                "text-main": "#181111",
                "text-muted": "#6b7280",
            },
            fontFamily: {
                "display": ["Manrope", "sans-serif"],
                "body": ["Manrope", "sans-serif"],
            },
            borderRadius: {
                "DEFAULT": "0.375rem",
                "md": "0.375rem",
                "lg": "0.5rem",
                "xl": "0.75rem",
                "2xl": "1rem",
            },
            boxShadow: {
                "swiss": "0 2px 0 rgba(0,0,0,0.05)",
                "swiss-hover": "0 10px 30px -10px rgba(0,0,0,0.1)",
            },
            maxWidth: {
                "container": "1440px",
            }
        },
    },
    plugins: [],
}
