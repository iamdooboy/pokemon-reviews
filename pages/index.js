import { Heading, Button, Flex, Box } from '@chakra-ui/react'
import PokemonContainer from '../components/pokemon-container'
import Layout from '../components/layout'

const Page = () => {
	return (
		<Layout>
			<Heading as='h1' size='xl' align='center' py={4}>
				Pokemon Reviews
			</Heading>
			<Heading as='h1' size='md' align='center' py={4}>
				Nintendo has been creating a lot of questionable Pokemon. Luckily they
				are looking for your feedback.
			</Heading>
			<PokemonContainer />
		</Layout>
	)
}

export default Page
