import { extendTheme } from '@chakra-ui/react'
import colors from './colors'

const config = {
	initialColorMode: 'dark',
	useSystemColorMode: false
}

const theme = extendTheme({
	colors,
	config
})

export default theme
