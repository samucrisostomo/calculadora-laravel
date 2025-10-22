import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
    	extend: {
    		fontFamily: {
    			sans: [
    				'Figtree',
                    ...defaultTheme.fontFamily.sans
                ]
    		},
    		colors: {
    			consorcio: {
    				light: '#86efac',
    				DEFAULT: '#22c55e',
    				dark: '#16a34a'
    			},
    			financiamento: {
    				light: '#93c5fd',
    				DEFAULT: '#3b82f6',
    				dark: '#2563eb'
    			},
    			border: 'hsl(var(--border))',
    			input: 'hsl(var(--input))',
    			ring: 'hsl(var(--ring))',
    			background: 'hsl(var(--background))',
    			foreground: 'hsl(var(--foreground))',
    			card: {
    				DEFAULT: 'hsl(var(--card))',
    				foreground: 'hsl(var(--card-foreground))'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			primary: {
    				DEFAULT: 'hsl(var(--primary))',
    				foreground: 'hsl(var(--primary-foreground))'
    			},
    			secondary: {
    				DEFAULT: 'hsl(var(--secondary))',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--accent))',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				foreground: 'hsl(var(--destructive-foreground))'
    			},
    			chart: {
    				'1': 'hsl(var(--chart-1))',
    				'2': 'hsl(var(--chart-2))',
    				'3': 'hsl(var(--chart-3))',
    				'4': 'hsl(var(--chart-4))',
    				'5': 'hsl(var(--chart-5))'
    			}
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
    		keyframes: {
    			'fade-in': {
    				'0%': {
    					opacity: '0',
    					transform: 'translateY(10px)'
    				},
    				'100%': {
    					opacity: '1',
    					transform: 'translateY(0)'
    				}
    			},
    			'slide-in': {
    				'0%': {
    					transform: 'translateX(-100%)'
    				},
    				'100%': {
    					transform: 'translateX(0)'
    				}
    			},
    			'slide-in-right': {
    				'0%': {
    					transform: 'translateX(100%)',
    					opacity: '0'
    				},
    				'100%': {
    					transform: 'translateX(0)',
    					opacity: '1'
    				}
    			},
    			'scale-in': {
    				'0%': {
    					transform: 'scale(0.95)',
    					opacity: '0'
    				},
    				'100%': {
    					transform: 'scale(1)',
    					opacity: '1'
    				}
    			},
    			'pulse-soft': {
    				'0%, 100%': {
    					opacity: '1'
    				},
    				'50%': {
    					opacity: '0.7'
    				}
    			},
    			'float-1': {
    				'0%, 100%': {
    					transform: 'translateY(0px) translateX(0px)'
    				},
    				'50%': {
    					transform: 'translateY(-20px) translateX(10px)'
    				}
    			},
    			'float-2': {
    				'0%, 100%': {
    					transform: 'translateY(0px) translateX(0px)'
    				},
    				'50%': {
    					transform: 'translateY(20px) translateX(-10px)'
    				}
    			},
    			'float-3': {
    				'0%, 100%': {
    					transform: 'translateY(0px) translateX(0px)'
    				},
    				'50%': {
    					transform: 'translateY(-15px) translateX(-15px)'
    				}
    			},
    			shake: {
    				'0%, 100%': {
    					transform: 'translateX(0)'
    				},
    				'10%, 30%, 50%, 70%, 90%': {
    					transform: 'translateX(-5px)'
    				},
    				'20%, 40%, 60%, 80%': {
    					transform: 'translateX(5px)'
    				}
    			},
    			glow: {
    				'0%, 100%': {
    					boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)'
    				},
    				'50%': {
    					boxShadow: '0 0 30px rgba(59, 130, 246, 0.8)'
    				}
    			},
    			gradient: {
    				'0%, 100%': {
    					backgroundPosition: '0% 50%'
    				},
    				'50%': {
    					backgroundPosition: '100% 50%'
    				}
    			}
    		},
    		animation: {
    			'fade-in': 'fade-in 0.5s ease-out',
    			'slide-in': 'slide-in 0.3s ease-out',
    			'slide-in-right': 'slide-in-right 0.3s ease-out',
    			'scale-in': 'scale-in 0.3s ease-out',
    			'pulse-soft': 'pulse-soft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    			'float-1': 'float-1 6s ease-in-out infinite',
    			'float-2': 'float-2 8s ease-in-out infinite',
    			'float-3': 'float-3 7s ease-in-out infinite',
    			shake: 'shake 0.5s ease-in-out',
    			glow: 'glow 2s ease-in-out infinite',
    			gradient: 'gradient 3s ease infinite'
    		}
    	}
    },

    plugins: [forms, require("tailwindcss-animate")],
};
