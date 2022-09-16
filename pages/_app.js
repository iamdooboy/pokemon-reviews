import { ChakraProvider } from '@chakra-ui/react'

const Website = ({ Component, pageProps, router }) => {
	return (
		<ChakraProvider>
			<Component {...pageProps} key={router.route} />
		</ChakraProvider>
	)
}

export default Website
