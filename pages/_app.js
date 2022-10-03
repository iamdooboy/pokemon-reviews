import { ChakraProvider } from '@chakra-ui/react'
import { SessionProvider } from 'next-auth/react'
import theme from '../lib/theme'
import Layout from '../components/layout'

const Website = ({ session, Component, pageProps, router }) => {
	return (
		<SessionProvider session={session}>
			<ChakraProvider theme={theme}>
				<Layout router={router}>
					<Component {...pageProps} key={router.asPath} />
				</Layout>
			</ChakraProvider>
		</SessionProvider>
	)
}

export default Website
