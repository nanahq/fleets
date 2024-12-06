import type { Config } from 'tailwindcss'

const config: any = {
	darkMode: ['class'], // Enable dark mode based on class
	content: [
		'./components/**/*.{ts,tsx}', // Scan files in the components directory
		'./app/**/*.{ts,tsx}', // Scan files in the app directory
	],
	prefix: '', // No prefix for Tailwind classes
	theme: {
		container: {
			center: true, // Center the container
			padding: '2rem', // Add padding to the container
			screens: {
				'2xl': '1400px', // Define custom container width for large screens
			},
		},
		extend: {
			colors: {
				"nana-100": "#ecf7fd",
				"nana-200": "#469ADC",
				border: 'hsl(var(--border))', // Use CSS variables for border color
				input: 'hsl(var(--input))', // Use CSS variables for input color
				ring: 'hsl(var(--ring))', // Use CSS variables for ring color
				background: 'hsl(var(--background))', // Background color
				foreground: 'hsl(var(--foreground))', // Foreground (text) color
				primary: {
					DEFAULT: 'hsl(var(--primary))', // Primary color
					foreground: 'hsl(var(--primary-foreground))', // Primary foreground color
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))', // Secondary color
					foreground: 'hsl(var(--secondary-foreground))', // Secondary foreground color
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))', // Destructive color (e.g., for delete actions)
					foreground: 'hsl(var(--destructive-foreground))', // Destructive foreground color
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))', // Muted background color
					foreground: 'hsl(var(--muted-foreground))', // Muted foreground color
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))', // Accent color
					foreground: 'hsl(var(--accent-foreground))', // Accent foreground color
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))', // Popover background color
					foreground: 'hsl(var(--popover-foreground))', // Popover foreground color
				},
				card: {
					DEFAULT: 'hsl(var(--card))', // Card background color
					foreground: 'hsl(var(--card-foreground))', // Card foreground color
				},
			},
			borderRadius: {
				lg: 'var(--radius)', // Large border radius using CSS variable
				md: 'calc(var(--radius) - 2px)', // Medium border radius
				sm: 'calc(var(--radius) - 4px)', // Small border radius
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' }, // Accordion animation from closed
					to: { height: 'var(--radix-accordion-content-height)' }, // Accordion animation to open
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' }, // Accordion animation from open
					to: { height: '0' }, // Accordion animation to closed
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out', // Ease-out animation for opening
				'accordion-up': 'accordion-up 0.2s ease-out', // Ease-out animation for closing
			},
		},
	},
	plugins: [require('tailwindcss-animate')], // Include the animate plugin for Tailwind
}

export default config
