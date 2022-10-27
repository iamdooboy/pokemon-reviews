import { ChakraProvider } from '@chakra-ui/react'
import { SessionProvider } from 'next-auth/react'
import theme from '../lib/theme'
import NextNProgress from 'nextjs-progressbar'

const Website = ({
	Component,
	pageProps: { session, ...pageProps },
	router
}) => {
	const getLayout = Component.getLayout || (page => page)
	return (
		<SessionProvider session={session}>
			<ChakraProvider theme={theme}>
				{getLayout(
					<>
						<NextNProgress color='#38B2AC' options={{ showSpinner: false }} />
						<Component key={router.asPath} {...pageProps} />
					</>
				)}
			</ChakraProvider>
		</SessionProvider>
	)
}

export default Website
