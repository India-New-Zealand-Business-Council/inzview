/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}', './public/**/*.html'],
    theme: {
        extend: {
            fontSize: {
                xs: ['0.75rem', { lineHeight: '1.2', letterSpacing: '0.02em', fontWeight: '400' }],
                sm: ['0.875rem', { lineHeight: '1.3', letterSpacing: '0.02em', fontWeight: '400' }],
                base: ['1rem', { lineHeight: '1.5', letterSpacing: '0.025em', fontWeight: '400' }],
                lg: ['1.125rem', { lineHeight: '1.5', letterSpacing: '0.025em', fontWeight: '400' }],
                xl: ['1.25rem', { lineHeight: '1.5', letterSpacing: '0.025em', fontWeight: '400' }],
                '2xl': ['1.5rem', { lineHeight: '1.4', letterSpacing: '0.02em', fontWeight: '600' }],
                '3xl': ['1.875rem', { lineHeight: '1.3', letterSpacing: '0.02em', fontWeight: '600' }],
                '4xl': ['2.25rem', { lineHeight: '1.2', letterSpacing: '0.015em', fontWeight: '700' }],
                '5xl': ['3rem', { lineHeight: '1.08', letterSpacing: '-0.015em', fontWeight: '700' }],
                '6xl': ['3.75rem', { lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '700' }],
                '7xl': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.025em', fontWeight: '700' }],
                '8xl': ['6rem', { lineHeight: '1', letterSpacing: '-0.01em', fontWeight: '700' }],
                '9xl': ['8rem', { lineHeight: '1', letterSpacing: '-0.02em', fontWeight: '700' }],
            },
            fontFamily: {
                heading: ['Poppins', 'system-ui', 'sans-serif'],
                paragraph: ['Poppins', 'system-ui', 'sans-serif'],
            },
            colors: {
                // INZBC. The purple and lime set Sunil confirmed, carried over from the
                // Studio build where every pair was checked against WCAG AA.
                ink: '#1a0b3f',
                deep: '#0e0522',
                navy: '#160933',
                forest: '#1b4640',
                lime: '#b8f07c',
                plum: '#61145f',
                mist: '#f4f2f8',

                // shadcn's semantic names, pointed at the palette above so the generated
                // ui/ components inherit the brand instead of Contentify's beige.
                background: '#ffffff',
                foreground: '#3a3742',
                primary: '#b8f07c',
                'primary-foreground': '#160933',
                secondary: '#160933',
                'secondary-foreground': '#ffffff',
                buttonbackground: '#b8f07c',
                buttonborder: '#160933',
                destructive: '#DF3131',
                destructiveforeground: '#FFFFFF',
            },
        },
    },
    future: {
        hoverOnlyWhenSupported: true,
    },
    plugins: [require('@tailwindcss/container-queries'), require('@tailwindcss/typography')],
}
