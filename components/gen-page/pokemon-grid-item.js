import axios from 'axios'
import { chakra, Box, GridItem, Text } from '@chakra-ui/react'
import { FallBackImage } from '../../utils/fallback-image'
import { motion } from 'framer-motion'
import { CustomRating } from '../rating'
import { GridItemSkeleton } from '../loading/gen-page-skeleton'
import { usePokeAPI } from '../../hooks/usePokeAPI'
import { useFetchReviews } from '../../hooks/useFetchReviews'

const PokemonGridItem = ({ pokemonName }) => {
	const fetcher = url =>
		axios.get(url, { params: { pokemon: pokemonName } }).then(res => res.data)

	const review = useFetchReviews(`/api/reviews/${pokemonName}`, fetcher)

	const data = usePokeAPI(pokemonName)

	if (!review || !data) {
		return <GridItemSkeleton />
	}

	const { count, rating } = review

	const { url, alt, name, id } = data

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
						src={url}
						alt={alt}
						fallbackSrc='/fallback.png'
						placeholder='blur'
						blurDataURL={url}
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
					<Box justifyContent='center' align='center'>
						<chakra.div my={1} maxW={100}>
							<CustomRating value={rating} readOnly />
						</chakra.div>
						<Box color='gray.600' fontSize='sm' align='center' mb={2}>
							{count} ratings
						</Box>
					</Box>
				</Box>
			</Box>
		</GridItem>
	)
}

export default PokemonGridItem
