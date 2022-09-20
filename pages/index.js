import { Container, Heading, Box, Input } from '@chakra-ui/react'
import Head from 'next/head'
import PokemonContainer from '../components/pokemon-container'

const Page = () => {
	return (
		<Box as='main' minHeight='100vh'>
			<Head>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<title>Pokemon Reviews</title>
			</Head>
			<Container maxW='7xl'>
				<Heading as='h1' size='xl' align='center' py={4}>
					Pokemon Reviews
				</Heading>
				<Heading as='h1' size='md' align='center' py={4}>
					Nintendo has been creating a lot of questionable Pokemon. Luckily they
					are looking for your feedback.
				</Heading>
				<Input placeholder='What pokemon are you looking for?' size='lg' />
				<PokemonContainer />
			</Container>
		</Box>
	)
}

export default Page
