/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,js,jsx,tsx}"],
	theme: {
		extend: {
			animation: {
				inclinedScroll: "inclinedScroll 8s linear infinite",
			},
			keyframes: {
				inclinedScroll: {
					"0%": { transform: "translateX(100%) translateY(-5px)" },
					"100%": { transform: "translateX(-65%) translateY(0px)" },
				},
			},
		},
	},
	plugins: [],
};
