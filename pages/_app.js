import { ChakraProvider } from '@chakra-ui/react'
import { SessionProvider } from 'next-auth/react'
import theme from '../lib/theme'

const Website = ({ session, Component, pageProps }) => {
	return (
		<SessionProvider session={session}>
			<ChakraProvider theme={theme}>
				<Component {...pageProps} />
			</ChakraProvider>
		</SessionProvider>
	)
}

export default Website
