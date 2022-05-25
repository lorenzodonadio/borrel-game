const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		/* screens: {
			'xs': '475px',
			...defaultTheme.screens,
		  }, */
		extend: {
			colors: {
				deernsblue: {
					DEFAULT: '#0047C4',
					50: '#EFF5FF',
					100: '#CFE2FF',
					200: '#ADC9F6',
					300: '#7CA8F0',
					400: '#296CE1',
					500: '#0047C4',
					600: '#0C419D',
					700: '#0B3378',
					800: '#0C285A',
					900: '#051C45'
				}
			},
			fontFamily: {
				k2d: ['K2D']
			}
		}
	},

	plugins: [require('@tailwindcss/forms')]
};

module.exports = config;
