import React, { useState, useRef, useEffect } from 'react'
import {
	chakra,
	Box,
	GridItem,
	Flex,
	Text,
	Stack,
	HStack,
	Avatar,
	Icon,
	Spacer,
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverBody,
	PopoverArrow,
	Button
} from '@chakra-ui/react'
import { useInput } from '../../hooks/useInput'
import { getPokemonImageUrl } from '../../utils/helpers'
import ReadMore from '../read-more'
import { AiOutlineEllipsis } from 'react-icons/ai'
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md'
import { useFavorite } from '../../hooks/useFavorite'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import { LinkOverlay } from '../link-overlay'
import { getAllPokemonNames } from '../../utils/axios'
import {
	getPokemonGeneration,
	formatNames,
	timeOffset,
	capitalFirstLetter
} from '../../utils/helpers'

const ReviewGridItem = ({
	id,
	description,
	rating,
	createdAt,
	pokemon,
	favorite,
	favoritedByCurrentUser,
	onEdit,
	onDelete,
	setPokemonName
}) => {
	const log = useRef(true)
	const [path, setPath] = useState('/')

	useEffect(() => {
		if (log.current) {
			const getPath = async () => {
				const res = await getAllPokemonNames()
				const index = res.indexOf(pokemon) + 1
				const gen = getPokemonGeneration(index)

				setPath(`gen/${gen}/${pokemon}`)
			}
			getPath()
		}

		return () => {
			log.current = false
		}
	}, [])

	const { pokemon: allPokemon } = useInput()
	const {
		favoriteClickHandler,
		numberOfFavorites,
		favorite: didUserFavorite
	} = useFavorite('review', id, favorite, favoritedByCurrentUser)

	const favoriteIcon = didUserFavorite ? (
		<MdFavorite color='#E53E3E' />
	) : (
		<MdFavoriteBorder />
	)

	const src = getPokemonImageUrl(allPokemon.indexOf(pokemon) + 1)

	let formattedName = formatNames(pokemon)
	formattedName = capitalFirstLetter(formattedName)

	return (
		<GridItem>
			<Box
				rounded={8}
				borderWidth='1px'
				shadow='lg'
				p={3}
				h='full'
				maxHeight='205px'
				overflow='auto'
			>
				<Stack direction='column' maxW='2xl'>
					<HStack spacing={3}>
						<LinkOverlay
							href={path}
							display='flex'
							gap={2}
							onClick={() => console.log('home')}
							cursor='pointer'
						>
							<Avatar bg='gray.700' size='md' name={pokemon} src={src} />
							<Flex direction='column'>
								<Text fontWeight='bold' fontSize='md'>
									{formattedName}
								</Text>
								<Text fontWeight='light' fontSize='xs'>
									{timeOffset(createdAt)}
								</Text>
							</Flex>
						</LinkOverlay>
						<Spacer />
						<Flex direction='column'>
							<Popover isLazy>
								<PopoverTrigger>
									<button onClick={() => setPokemonName(pokemon)}>
										<Icon as={AiOutlineEllipsis} />
									</button>
								</PopoverTrigger>
								<PopoverContent w='150px'>
									<PopoverArrow />
									<PopoverBody p={0}>
										<Box>
											<Button
												onClick={() => onEdit({ id, description, rating })}
												leftIcon={<EditIcon />}
												variant='ghost'
												w='full'
												rounded='none'
												justifyContent='start'
											>
												Edit
											</Button>
											<Button
												onClick={() => onDelete(id)}
												leftIcon={<DeleteIcon />}
												variant='ghost'
												w='full'
												rounded='none'
												justifyContent='start'
											>
												Delete
											</Button>
										</Box>
									</PopoverBody>
								</PopoverContent>
							</Popover>
							<Flex gap={1}>
								<chakra.button onClick={() => favoriteClickHandler()}>
									{favoriteIcon}
								</chakra.button>
								<Text fontSize='sm'>{numberOfFavorites}</Text>
							</Flex>
						</Flex>
					</HStack>
					<Flex my={3} alignItems='center' justify='start'>
						{Array.from(Array(rating).keys()).map(id => {
							return <Star key={id} fillColor='#EACA4E' />
						})}
						{Array.from(Array(5 - rating).keys()).map(id => {
							return <Star key={id} fillColor='#e2e8f0' />
						})}
					</Flex>
					<ReadMore noOfLines={3}>{description}</ReadMore>
				</Stack>
			</Box>
		</GridItem>
	)
}

export default ReviewGridItem

const Star = ({ fillColor }) => {
	return (
		<svg
			style={{
				width: '1rem',
				height: '1rem',
				fill: fillColor,
				marginRight: '0.25rem'
			}}
			viewBox='0 0 1000 1000'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path d='M972 380c9 28 2 50-20 67L725 619l87 280c11 39-18 75-54 75-12 0-23-4-33-12L499 790 273 962a58 58 0 0 1-78-12 50 50 0 0 1-8-51l86-278L46 447c-21-17-28-39-19-67 8-24 29-40 52-40h280l87-279c7-23 28-39 52-39 25 0 47 17 54 41l87 277h280c24 0 45 16 53 40z' />
		</svg>
	)
}
