import {
	chakra,
	Box,
	GridItem,
	Flex,
	Text,
	Stack,
	HStack,
	Avatar,
	Spacer,
	Button
} from '@chakra-ui/react'
import { getPokemonImageUrl } from '../../utils/helpers'
import ReadMore from '../read-more'
import { FaThumbsUp, FaRegThumbsUp } from 'react-icons/fa'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import { LinkOverlay } from '../link-overlay'
import { motion } from 'framer-motion'
import { EllipsisButton } from '../ellipsis-button'
import { usePokeAPI } from '../../hooks/usePokeAPI'
import {
	getPokemonGeneration,
	formatNames,
	timeOffset,
	capitalFirstLetter
} from '../../utils/helpers'
import { CustomRating } from '../rating'

const ReviewGridItem = ({ review, like, remove, onOpen, setSelected }) => {
	const {
		id,
		description,
		rating,
		createdAt,
		pokemon,
		favorite,
		favoritedByCurrentUser
	} = review

	const [_, fetchAllPokemon] = usePokeAPI()

	const { data: allPokemon, isLoading } = fetchAllPokemon('all')

	if (isLoading) return <div>loading</div>

	const index = allPokemon?.indexOf(pokemon) + 1
	const gen = getPokemonGeneration(index)
	const href = `gen/${gen}/${pokemon}`
	const src = getPokemonImageUrl(index)
	const formattedName = capitalFirstLetter(formatNames(pokemon))

	const favoriteIcon = favoritedByCurrentUser ? (
		<FaThumbsUp color='#38B2AC' />
	) : (
		<FaRegThumbsUp />
	)
	const onClickHandler = () => {
		setSelected(review)
		onOpen()
	}

	return (
		<GridItem>
			<Box
				as={motion.div}
				rounded={8}
				borderWidth='1px'
				shadow='lg'
				p={3}
				h='full'
				maxHeight='205px'
				overflow='auto'
				whileHover={{ y: -7 }}
				transition='0.08s linear'
				_hover={{ borderColor: 'whiteAlpha.700', bg: 'gray.700' }}
			>
				<Stack direction='column' maxW='2xl'>
					<HStack spacing={3}>
						<LinkOverlay href={href} display='flex' gap={2} cursor='pointer'>
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
						<Stack
							direction='row'
							spacing={4}
							display={['none', 'none', 'none', 'inline']}
						>
							<Flex gap={3}>
								<Flex gap={1}>
									<chakra.button onClick={() => like(review)}>
										{favoriteIcon}
									</chakra.button>
									<Text fontSize='md'>{favorite}</Text>
								</Flex>
								<Button
									size='xs'
									leftIcon={<EditIcon />}
									colorScheme='gray'
									variant='solid'
									onClick={onClickHandler}
								>
									Edit
								</Button>
								<Button
									size='xs'
									leftIcon={<DeleteIcon />}
									colorScheme='red'
									variant='outline'
									onClick={() => remove({ id })}
								>
									Delete
								</Button>
							</Flex>
						</Stack>
						<Flex
							direction='column'
							display={['inline', 'inline', 'inline-block', 'none']}
						>
							<EllipsisButton {...{ setSelected, review, onOpen, remove }} />
							<Flex gap={1}>
								<chakra.button onClick={() => like(review)}>
									{favoriteIcon}
								</chakra.button>
								<Text fontSize='sm'>{favorite}</Text>
							</Flex>
						</Flex>
					</HStack>
					<chakra.div my={1} maxW={100}>
						<CustomRating value={rating} readOnly />
					</chakra.div>
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
