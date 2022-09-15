import React from 'react'
import { Box, Text, Image } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'

const PokemonInfo = ({ id, imageUrl, imageAlt, name, rating, reviewCount }) => {
	const formatName = name.charAt(0).toUpperCase() + name.slice(1)
	return (
		<>
			<Box as='span' ml={1} color='gray.600' opacity='0.5'>
				{id.toString().padStart(3, '0')}
			</Box>
			<Box align='center'>
				<Image
					boxSize='100px'
					src={imageUrl}
					alt={imageAlt}
					fallbackSrc='/fallback.png'
				/>
			</Box>
			<Box>
				<Text
					fontWeight='bold'
					as='h1'
					lineHeight='tight'
					noOfLines={1}
					align='center'
				>
					{formatName}
				</Text>

				<Box display='flex' mt='2' justifyContent='center'>
					{Array(5)
						.fill('')
						.map((_, i) => (
							<StarIcon
								key={i}
								color={i < rating ? 'yellow.400' : 'gray.300'}
							/>
						))}
				</Box>
				<Box color='gray.600' fontSize='sm' align='center'>
					{reviewCount} ratings
				</Box>
			</Box>
		</>
	)
}

export default PokemonInfo
