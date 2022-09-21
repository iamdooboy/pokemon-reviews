import { extendTheme } from '@chakra-ui/react'

const config = {
	initialColorMode: 'dark',
	useSystemColorMode: false
}

const theme = extendTheme({
	components: {
		Badge: {
			baseStyle: {
				borderRadius: 16,
				color: 'white',
				borderWidth: 2,
				textTransform: 'capitalize',
				fontSize: 14
			},
			variants: {
				water: {
					bg: '#4b9bfa',
					borderColor: '#e5f3ff'
				},
				poison: {
					bg: '#9c5895',
					borderColor: '#fae0fd'
				},
				fire: {
					bg: '#e34d3c',
					borderColor: '#f5cbbf'
				},
				electric: {
					bg: '#f7d02b',
					borderColor: '#f1ddab'
				},
				rock: {
					bg: '#baac65',
					borderColor: '#e3ddc5'
				},
				ground: {
					bg: '#dbb94b',
					borderColor: '#eae1b8'
				},
				normal: {
					bg: '#acb19d',
					borderColor: '#e7e7e7'
				},
				psychic: {
					bg: '#dd60a0',
					borderColor: '#f2cce1'
				},
				grass: {
					bg: '#81c649',
					borderColor: '#d8f5bb'
				},
				ice: {
					bg: '#86dafc',
					borderColor: '#def5fa'
				},
				dragon: {
					bg: '#7769f0',
					borderColor: '#e4e4ee'
				},
				bug: {
					bg: '#b2c221',
					borderColor: '#e3e88c'
				},
				dark: {
					bg: '#80604b',
					borderColor: '#ede0d8'
				},
				fighting: {
					bg: '#a35747',
					borderColor: '#fbd2cc'
				},
				ghost: {
					bg: '#6e6bc2',
					borderColor: '#cecef0'
				},
				steel: {
					bg: '#adb2c6',
					borderColor: '#efeef4'
				},
				flying: {
					bg: '#6a99f1',
					borderColor: '#e8f7fe'
				},
				fairy: {
					bg: '#e19de6',
					borderColor: '#fae4f9'
				}
			}
		}
	},
	config
})

export default theme
