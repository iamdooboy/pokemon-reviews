import React from 'react'
import { Box, HStack, Text, Image, Badge, Heading } from '@chakra-ui/react'

const TopHalf = ({ data }) => {
	const { id, imageAlt, imageUrl, name, typesArr } = data
	const formatName = name.charAt(0).toUpperCase() + name.slice(1)
	let paddedId = id.toString().padStart(3, '0')
	return (
		<>
			<Box>
				<Text pr={1} align='right' color='gray.600'>
					{paddedId}
				</Text>
				<Image
					w={{ base: '70%' }}
					objectFit='cover'
					src={imageUrl}
					alt={imageAlt}
				/>
			</Box>
			<Heading as='h2' size='lg' fontWeight='bold' my={4}>
				{formatName}
			</Heading>
			<HStack align='center' justify='center' py={1}>
				{typesArr.map((type, index) => (
					<Badge variant={type} key={index}>
						{type}
					</Badge>
				))}
			</HStack>
		</>
	)
}

export default TopHalf
