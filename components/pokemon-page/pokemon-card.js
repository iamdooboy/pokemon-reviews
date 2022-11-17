import {
	chakra,
	Box,
	HStack,
	Text,
	Image,
	Heading,
	Flex,
	Stack
} from '@chakra-ui/react'
import { FallBackImage } from '../../utils/fallback-image'
import { usePokeAPI } from '../../hooks/usePokeAPI'
import { useFetchReviews } from '../../hooks/useFetchReviews'
import { CustomRating } from '../rating'
import axios from 'axios'
import { PokemonCardSkeleton } from '../loading/pokemon-card-skeleton'

const PokemonCard = ({ pokemonName }) => {
	const fetcher = url =>
		axios.get(url, { params: { pokemon: pokemonName } }).then(res => res.data)

	const key = `/api/reviews/${pokemonName}`

	const {
		reviews,
		isLoading: reviewsAreLoading,
		calcRatings
	} = useFetchReviews(key, fetcher)

	const [fetchOnePokemon] = usePokeAPI()

	const { data, isLoading, formatData } = fetchOnePokemon(pokemonName)

	if (reviewsAreLoading || isLoading) return <PokemonCardSkeleton />

	const { count, rating } = calcRatings(reviews)

	const { url, alt, name, id, types } = formatData(data)

	return (
		<Box
			bgGradient={`linear(to-tl, ${types[0]}.default, ${
				types[1] ? types[1] + '.default' : types[0] + '.light'
			})`}
			p='2px'
			rounded={8}
			maxW='xs'
			pos='relative'
			zIndex={-1}
		>
			<Box maxW='xs' p={3} rounded={8} mx='auto' bg='rgba(17, 25, 40, 0.6)'>
				<Box
					borderWidth={2}
					rounded={4}
					bg='#282d359e'
					borderColor='whiteAlpha.600'
					maxW='100%'
					height='auto'
				>
					<Text opacity={0.4} px={1} align='start' zIndex={1}>
						{id}
					</Text>
					<Box mt='-15px'>
						<FallBackImage
							w='auto'
							h='auto'
							width={600}
							height={600}
							src={url}
							alt={alt}
							fallback='/bug.svg'
							placeholder='blur'
							blurDataURL={url}
						/>
					</Box>
				</Box>
				<Box>
					<Heading
						as='h1'
						size='lg'
						fontWeight='800'
						letterSpacing={1}
						align='left'
					>
						{name}
					</Heading>
					<HStack>
						<Stack>
							<HStack>
								{types.map((type, index) => (
									<Image
										key={index}
										boxSize='23%'
										src={`/type/${type}.png`}
										alt={`${type}`}
									/>
								))}
							</HStack>
							<Flex align='center' mt={4}>
								<chakra.div my={1} maxW={100}>
									<CustomRating value={rating} readOnly />
								</chakra.div>
								<Text fontSize='lg' opacity={0.4}>
									&nbsp;({count})
								</Text>
							</Flex>
						</Stack>
						<Heading
							as='h1'
							fontSize='5xl'
							fontWeight='900'
							position='relative'
							_before={{
								content: '""',
								position: 'absolute',
								top: '100%',
								width: '100%',
								left: '0',
								height: '2px',
								bgGradient: `linear(to-r, ${types[0]}.default, ${
									types[1] ? types[1] + '.default' : types[0] + '.light'
								})`
							}}
						>
							{rating.toFixed(1)}
						</Heading>
					</HStack>
				</Box>
			</Box>
		</Box>
	)
}

export default PokemonCard
