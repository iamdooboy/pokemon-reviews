'use client'

import Image from 'next/image'
import { chakra, Box, GridItem, Text } from '@chakra-ui/react'
import { usePokeAPI } from '../../../hooks/usePokeAPI'
import { FallBackImage } from '../../../utils/fallback-image'

const PokemonGridItem = ({ pokemonName }) => {
	const { fetchOnePokemon } = usePokeAPI()
	const { data, isLoading, formatData } = fetchOnePokemon(pokemonName)

	if (isLoading) return <div>loading</div>
	const { url, alt, name, id } = formatData(data)

	return (
		<GridItem>
			<Box
				rounded={8}
				borderWidth='1px'
				shadow='lg'
				transition='0.08s linear'
				_hover={{ borderColor: 'whiteAlpha.800', bg: 'gray.700' }}
			>
				<Text pr={1} align='right' color='gray.600'>
					{id}
				</Text>
				<Box align='center' pos='relative'>
					<FallBackImage
						w='auto'
						h='auto'
						width={100}
						height={100}
						src={url}
						alt={alt}
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
						{name}
					</Text>
					{/* <Box justifyContent='center' align='center'>
						<chakra.div my={1} maxW={100}>
							<CustomRating value={1} readOnly />
						</chakra.div>
						<Box color='gray.600' fontSize='sm' align='center' mb={2}>
							{1} ratings
						</Box>
					</Box> */}
				</Box>
			</Box>
		</GridItem>
	)
}

export default PokemonGridItem
