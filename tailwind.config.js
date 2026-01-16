/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{html,ts}",
    ],
    theme: {
        extend: {
            colors: {
                "primary": "#6298d1",
                "primary-dark": "#4a7ab5",
                "background-light": "#ffffff",
                "background-dark": "#0e172e",
                "surface-light": "#f4f4f5",
                "surface-dark": "#1a2642",
                "text-main": "#0e172e",
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
