import { Heading, Flex, Box } from '@chakra-ui/react'
import Layout from '../components/layout'
import Psyduck from '../components/eye-tracking/psyduck'
import { useMousePosition } from '../hooks/useMousePosition'
import NextImage from 'next/image'

const Custom404 = () => {
	//const deg = useMousePosition()

	return (
		<Layout>
			<Flex pt={16}>
				<Heading>
					We’re sorry. We can’t find the page you’re looking for.
				</Heading>
				<NextImage src='/psyduck.png' height='300px' width='300px' />
			</Flex>
		</Layout>
	)
}

export default Custom404
