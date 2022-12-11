import { Heading, Box, Container, Button } from '@chakra-ui/react'
import Layout from '../components/layout'
import NextImage from 'next/image'
import { LinkOverlay } from '../components/link-overlay'

const Custom404 = () => {
	return (
		<Layout>
			<Container maxW='xl'>
				<Box pt={40} align='center'>
					<Heading size='lg' mb={4}>
						This page could not be found.
					</Heading>
					<NextImage src='/psyduck.png' height='300px' width='200px' />
					<Box mt={4}>
						<LinkOverlay href='/'>
							<Button colorScheme='teal'>Return to Home</Button>
						</LinkOverlay>
					</Box>
				</Box>
			</Container>
		</Layout>
	)
}

export default Custom404
