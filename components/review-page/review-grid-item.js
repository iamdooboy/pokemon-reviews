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
import {
	getPokemonGeneration,
	formatNames,
	timeOffset,
	capitalFirstLetter
} from '../../utils/helpers'
import { getPokemonImageUrl } from '../../utils/helpers'
import ReadMore from '../read-more'
import { FaThumbsUp, FaRegThumbsUp } from 'react-icons/fa'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import { LinkOverlay } from '../link-overlay'
import { motion } from 'framer-motion'
import { EllipsisButton } from '../ellipsis-button'
import { usePokeAPI } from '../../hooks/usePokeAPI'
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

	const { data: allPokemon } = fetchAllPokemon('all')

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
