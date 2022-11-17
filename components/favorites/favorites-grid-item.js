import React from 'react'
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
import { FallBackImage } from '../../utils/fallback-image'
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md'
import { getPokemonGeneration } from '../../utils/helpers'
import { LinkOverlay } from '../link-overlay'
import { motion } from 'framer-motion'
import { usePokeAPI } from '../../hooks/usePokeAPI'
import { FavoritePokemonGridItemSkeleton } from '../loading/favorite-pokemon-skeleton'

const FavoritesGridItem = ({
	id,
	pokemon,
	favorite,
	favoritedByCurrentUser,
	onFav
}) => {
	const [fetchOnePokemon] = usePokeAPI()
	const { data, isLoading, formatData } = fetchOnePokemon(pokemon)

	if (isLoading) return <FavoritePokemonGridItemSkeleton />

	const favoriteIcon = favoritedByCurrentUser ? (
		<Icon
			onClick={() => onFav({ id, pokemon, favorite, favoritedByCurrentUser })}
			as={MdFavorite}
			w={8}
			h={8}
			color='red.500'
			cursor='pointer'
		/>
	) : (
		<Icon
			onClick={() => onFav({ id, pokemon, favorite, favoritedByCurrentUser })}
			as={MdFavoriteBorder}
			w={8}
			h={8}
			cursor='pointer'
		/>
	)

	const { types, url, alt, name, id: pokemonId } = formatData(data)

	const gen = getPokemonGeneration(data.id)

	return (
		<GridItem>
			<Box
				as={motion.div}
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
				whileHover={{ scale: 1.1 }}
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
							>
								<FallBackImage
									w='auto'
									h='auto'
									width={300}
									height={300}
									src={url}
									alt={alt}
									fallbackSrc='/fallback.png'
									placeholder='blur'
									blurDataURL={url}
								/>
							</Box>
						</LinkOverlay>

						<Flex>
							<Box align='left'>
								<LinkOverlay href={`/gen/${gen}/${pokemon}`}>
									<Flex justify='space-between' mt={1} align='center'>
										<Heading
											as='h1'
											size='md'
											fontWeight='800'
											letterSpacing={1}
										>
											{name}
										</Heading>
										<Text opacity={0.4} align='end' zIndex={1}>
											{pokemonId}
										</Text>
									</Flex>
								</LinkOverlay>

								<HStack my={2} justify='space-between'>
									<HStack>
										{types.map((type, index) => (
											<Image
												key={index}
												boxSize='30%'
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

// const FavoritesGridItem = ({
// 	id,
// 	pokemon,
// 	favorite: numOfFav,
// 	num,
// 	typesArr,
// 	imageUrl,
// 	imageAlt
// }) => {
// 	const { favoriteClickHandler, favorite } = useFavorite(
// 		'pokemon',
// 		id,
// 		numOfFav,
// 		true
// 	)

// 	const favoriteIcon = favorite ? (
// 		<Icon
// 			onClick={() => favoriteClickHandler()}
// 			as={MdFavorite}
// 			w={8}
// 			h={8}
// 			color='red.500'
// 			cursor='pointer'
// 		/>
// 	) : (
// 		<Icon
// 			onClick={() => favoriteClickHandler()}
// 			as={MdFavoriteBorder}
// 			w={8}
// 			h={8}
// 			cursor='pointer'
// 		/>
// 	)

// 	let formattedName = formatNames(pokemon)
// 	formattedName = capitalFirstLetter(formattedName)

// 	const gen = getPokemonGeneration(num)

// 	return (
// 		<GridItem>
// 			<Box
// 				as={motion.div}
// 				p='2px'
// 				rounded={8}
// 				maxW='xs'
// 				pos='relative'
// 				zIndex={1}
// 				bg='whiteAlpha.600'
// 				_hover={{
// 					bgGradient: `linear(to-tl, ${typesArr[0]}.default, ${
// 						typesArr[1] ? typesArr[1] + '.default' : typesArr[0] + '.light'
// 					})`
// 				}}
// 				whileHover={{ scale: 1.1 }}
// 				transition='0.08s linear'
// 				opacity={favorite ? 1 : 0.4}
// 			>
// 				<Box
// 					maxW='xs'
// 					rounded={8}
// 					mx='auto'
// 					bg='gray.700'
// 					_hover={{ bg: 'rgba(17, 25, 40, 0.6)' }}
// 				>
// 					<Box p={3}>
// 						<LinkOverlay href={`/gen/${gen}/${pokemon}`}>
// 							<Box
// 								borderWidth={2}
// 								rounded={4}
// 								bg='#282d359e'
// 								borderColor='whiteAlpha.600'
// 								maxW='100%'
// 								height='auto'
// 							>
// 								<FallBackImage
// 									w='auto'
// 									h='auto'
// 									width={300}
// 									height={300}
// 									src={imageUrl}
// 									alt={imageAlt}
// 									fallbackSrc='/fallback.png'
// 									placeholder='blur'
// 									blurDataURL='https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png'
// 								/>
// 							</Box>
// 						</LinkOverlay>

// 						<Flex>
// 							<Box align='left'>
// 								<LinkOverlay href={`/gen/${gen}/${pokemon}`}>
// 									<Flex justify='space-between' mt={1} align='center'>
// 										<Heading
// 											as='h1'
// 											size='md'
// 											fontWeight='800'
// 											letterSpacing={1}
// 										>
// 											{formattedName}
// 										</Heading>
// 										<Text opacity={0.4} align='end' zIndex={1}>
// 											{num.toString().padStart(3, '0')}
// 										</Text>
// 									</Flex>
// 								</LinkOverlay>

// 								<HStack my={2} justify='space-between'>
// 									<HStack>
// 										{typesArr.map((type, index) => (
// 											<Image
// 												key={index}
// 												boxSize='30%'
// 												src={`/type/${type}.png`}
// 												alt={`${type}`}
// 											/>
// 										))}
// 									</HStack>
// 									{favoriteIcon}
// 								</HStack>
// 							</Box>
// 						</Flex>
// 					</Box>
// 				</Box>
// 			</Box>
// 		</GridItem>
// 	)
// }

// export default FavoritesGridItem
