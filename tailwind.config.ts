import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					light: 'hsl(var(--primary-light))',
					dark: 'hsl(var(--primary-dark))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// Custom theme colors - Boho-Modern palette
				plum: {
					DEFAULT: 'hsl(var(--plum))',
					light: 'hsl(var(--plum-light))',
					dark: 'hsl(var(--plum-dark))'
				},
				gold: {
					DEFAULT: 'hsl(var(--gold))',
					light: 'hsl(var(--gold-light))',
					dark: 'hsl(var(--gold-dark))'
				},
				wine: {
					DEFAULT: 'hsl(var(--wine))'
				},
				cream: {
					DEFAULT: 'hsl(var(--cream))',
					dark: 'hsl(var(--cream-dark))'
				},
				charcoal: {
					DEFAULT: 'hsl(var(--charcoal))',
					light: 'hsl(var(--charcoal-light))'
				},
				success: {
					DEFAULT: 'hsl(var(--success))'
				},
				// Legacy mystic colors for PT-BR
				mystic: {
					purple: 'hsl(280, 100%, 50%)',
					'purple-light': 'hsl(280, 100%, 70%)',
					magenta: 'hsl(320, 100%, 60%)',
					red: 'hsl(0, 100%, 50%)',
					'red-dark': 'hsl(0, 80%, 40%)',
					pink: 'hsl(340, 100%, 60%)',
					dark: 'hsl(0, 0%, 0%)',
					darker: 'hsl(0, 0%, 5%)',
					gold: 'hsl(45, 100%, 60%)',
					'gold-bright': 'hsl(50, 100%, 70%)',
					cream: 'hsl(40, 30%, 90%)'
				}
			},
			fontFamily: {
				'display': ['Poppins', 'Montserrat', 'sans-serif'],
				'body': ['Inter', 'Roboto', 'sans-serif'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			boxShadow: {
				'card': '0 6px 18px rgba(10, 10, 10, 0.08)',
				'gold': '0 4px 16px 0 hsl(40, 52%, 54%, 0.25)',
				'gold-lg': '0 6px 20px 0 hsl(40, 52%, 54%, 0.35)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in-up': {
					from: { opacity: '0', transform: 'translateY(20px)' },
					to: { opacity: '1', transform: 'translateY(0)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in-up': 'fade-in-up 0.6s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;