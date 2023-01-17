import {
	GridItem,
	Box,
	Text,
	HStack,
	Image,
	Heading,
	Flex,
	Icon
} from '@chakra-ui/react'
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md'
import {
	getPokemonGeneration,
	capitalFirstLetter,
	formatNames
} from '../../utils/helpers'
import { LinkOverlay } from '../link-overlay'
import { usePokeAPI } from '../../hooks/usePokeAPI'
import { FavoritePokemonGridItemSkeleton } from '../loading/favorite-pokemon-skeleton'
import { m } from 'framer-motion'
import { ProgressImage } from '../progressive-image'

const FavoritesGridItem = ({
	id: cuid,
	pokemon,
	favorite,
	favoritedByCurrentUser,
	onFav
}) => {
	const { fetchOnePokemon } = usePokeAPI()
	const { data, isLoading } = fetchOnePokemon(pokemon)

	if (isLoading) return <FavoritePokemonGridItemSkeleton />

	const formattedName = capitalFirstLetter(formatNames(pokemon))

	const favoriteIcon = (
		<Icon
			onClick={() =>
				onFav({ id: cuid, pokemon, favorite, favoritedByCurrentUser })
			}
			as={favoritedByCurrentUser ? MdFavorite : MdFavoriteBorder}
			w={8}
			h={8}
			color={favoritedByCurrentUser ? 'red.500' : ''}
			cursor='pointer'
		/>
	)

	const { id, image, types } = data

	const gen = getPokemonGeneration(id)

	return (
		<GridItem>
			<Box
				as={m.div}
				p='2px'
				rounded={8}
				maxW='xs'
				pos='relative'
				zIndex={1}
				bg='whiteAlpha.600'
				_hover={{
					bgGradient: `linear(to-tl, ${types[0]}.default, ${
						types[1] ? types[1] + '.default' : types[0] + '.light'
					})`
				}}
				whileHover={{ scale: 1.05 }}
				transition='0.08s linear'
				opacity={favoritedByCurrentUser ? 1 : 0.4}
			>
				<Box
					maxW='xs'
					rounded={8}
					mx='auto'
					bg='gray.700'
					_hover={{ bg: 'rgba(17, 25, 40, 0.6)' }}
				>
					<Box p={3}>
						<LinkOverlay href={`/gen/${gen}/${pokemon}`}>
							<Box
								borderWidth={2}
								rounded={4}
								bg='#282d359e'
								borderColor='whiteAlpha.600'
								maxW='100%'
								height='auto'
								align='center'
							>
								<ProgressImage
									lowQuality={`/low-quality/${id}`}
									highQuality={image}
									boxSize='auto'
									alt={formattedName}
								/>
							</Box>
						</LinkOverlay>

						<Flex>
							<Box align='left'>
								<LinkOverlay href={`/gen/${gen}/${pokemon}`}>
									<Flex justify='space-between' mt={1} align='center'>
										<Heading
											as='h1'
											size='lg'
											fontWeight='800'
											letterSpacing={1}
										>
											{formattedName}
										</Heading>
										<Text opacity={0.4} align='end' zIndex={1}>
											{id}
										</Text>
									</Flex>
								</LinkOverlay>

								<HStack my={2} justify='space-between'>
									<HStack>
										{types.map((type, index) => (
											<Image
												key={index}
												boxSize='25%'
												src={`/type/${type}.png`}
												alt={`${type}`}
											/>
										))}
									</HStack>
									{favoriteIcon}
								</HStack>
							</Box>
						</Flex>
					</Box>
				</Box>
			</Box>
		</GridItem>
	)
}

export default FavoritesGridItem
