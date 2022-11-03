import { chakra, Box, GridItem, Text } from '@chakra-ui/react'
import { FallBackImage } from '../../utils/fallback-image'
import { formatNames, capitalFirstLetter } from '../../utils/helpers'
import { motion } from 'framer-motion'
import { CustomRating } from '../rating'
import useSWR from 'swr'
import axios from 'axios'
import { useFetchPokemon } from '../../hooks/useFetchPokemon'

const PokemonGridItem = ({ name, api }) => {
	const { data: review } = useSWR(`/api/review/${name}`, () =>
		axios
			.get('/api/reviews', {
				params: { pokemon: name }
			})
			.then(res => res.data)
	)

	const { pokemon, isLoading, isError } = useFetchPokemon(name)

	if (!review || isLoading) {
		return <div>loading</div>
	}

	if (isError) {
		return <div>error</div>
	}

	const totalRating = review
		? review.reduce((sum, obj) => sum + obj.rating, 0)
		: 0

	let averageRating = totalRating ? totalRating / review.length : 0

	averageRating = Math.round(averageRating * 10) / 10

	const reviewCount = review.length
	const id = pokemon.id.toString().padStart(3, '0')
	const imageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png`

	return (
		<GridItem>
			<Box
				as={motion.div}
				rounded={8}
				borderWidth='1px'
				shadow='lg'
				whileHover={{ scale: 1.1 }}
				transition='0.08s linear'
				_hover={{ borderColor: 'whiteAlpha.800', bg: 'gray.700' }}
			>
				<Text pr={1} align='right' color='gray.600'>
					{id}
				</Text>
				<Box align='center' pos='relative' zIndex={1}>
					<FallBackImage
						w='auto'
						h='auto'
						width='100px'
						height='100px'
						src={imageUrl}
						alt={name}
						fallbackSrc='/fallback.png'
						placeholder='blur'
						blurDataURL={imageUrl}
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
						{capitalFirstLetter(formatNames(name))}
					</Text>
					<Box justifyContent='center' align='center'>
						<chakra.div my={1} maxW={100}>
							<CustomRating value={averageRating} readOnly />
						</chakra.div>
						<Box color='gray.600' fontSize='sm' align='center' mb={2}>
							{reviewCount} ratings
						</Box>
					</Box>
				</Box>
			</Box>
		</GridItem>
	)
}

export default PokemonGridItem
