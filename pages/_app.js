import { ChakraProvider } from '@chakra-ui/react'
import { SessionProvider } from 'next-auth/react'
import theme from '../lib/theme'

const Website = ({ session, Component, pageProps, router }) => {
	const getLayout = Component.getLayout || (page => page)
	return (
		<SessionProvider session={session}>
			<ChakraProvider theme={theme}>
				{getLayout(<Component key={router.asPath} {...pageProps} />)}
			</ChakraProvider>
		</SessionProvider>
	)
}

export default Website
