import { ChakraProvider } from '@chakra-ui/react'
import { SessionProvider } from 'next-auth/react'
import theme from '../lib/theme'
import NextNProgress from 'nextjs-progressbar'
import '@smastrom/react-rating/style.css'
import { AppProvider } from '../context/state'
import { LazyMotion, domAnimation } from 'framer-motion'

const Website = ({
	Component,
	pageProps: { session, ...pageProps },
	router
}) => {
	const getLayout = Component.getLayout || (page => page)
	return (
		<SessionProvider session={session}>
			<LazyMotion features={domAnimation}>
				<ChakraProvider theme={theme}>
					<AppProvider>
						{getLayout(
							<>
								<NextNProgress
									color='#38B2AC'
									options={{ showSpinner: false }}
								/>

								<Component key={router.asPath} {...pageProps} />
							</>
						)}
					</AppProvider>
				</ChakraProvider>
			</LazyMotion>
		</SessionProvider>
	)
}

export default Website
