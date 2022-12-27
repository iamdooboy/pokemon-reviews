import { Box, Heading, Center, Text } from '@chakra-ui/react'

const Empty = ({ heading, text }) => {
	return (
		<Center h='calc(100vh - var(--chakra-sizes-16))' color='white'>
			<Box align='center'>
				<Heading as='h5' size='lg'>
					{heading}
				</Heading>
				<Text color='gray.500' mt={2}>
					{text}
				</Text>
			</Box>
		</Center>
	)
}

export default Empty
