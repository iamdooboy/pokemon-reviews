import {
	chakra,
	Container,
	Button,
	HStack,
	Box,
	useDisclosure,
	Flex,
	Text
} from '@chakra-ui/react'
import axios from 'axios'
import { useRef, useState } from 'react'
import { getSession, useSession } from 'next-auth/react'
import { MdFavoriteBorder, MdOutlineEdit, MdFavorite } from 'react-icons/md'
import { prisma } from '../../../lib/prisma'
import { getPokemon, getAllPokemonFromGen } from '../../../utils/axios'
import ReviewBox from '../../../components/review-page/reviews/review-box'
import ReviewModal from '../../../components/review-page/reviews/add-review-modal'
import PokemonPage from '../../../components/review-page/pokemon-card'
import Layout from '../../../components/layout'
import Sidebar from '../../../components/sidebar/sidebar'
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import { useInput } from '../../../hooks/useInput'
import NavButton from '../../../components/nav-button'
import RandomButton from '../../../components/random-button'
import { formatNames, capitalFirstLetter } from '../../../utils/helpers'

const Empty = ({ pokemonName }) => {
	const formatName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)
	return (
		<Box
			fontWeight='600'
			maxW='xs'
			rounded={8}
			borderWidth={1}
			align='center'
			mt={3}
			mx='auto'
			p={3}
			bg='rgba(17, 25, 40, 0.75)'
		>
			Be the first to review {formatName}!
		</Box>
	)
}

const Pokemon = ({
	user = { id: null },
	reviews = [],
	data,
	pokemonName,
	numOfFavorite = 0,
	didUserFavoriteThisPokemon = false,
	pokemonId,
	genId
}) => {
	const initialRef = useRef()
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [allReviews, setAllReviews] = useState(reviews)
	const [numberOfFavorites, setNumberOfFavorites] = useState(numOfFavorite)
	const [favorite, setFavorite] = useState(didUserFavoriteThisPokemon)
	const [editReview, setEditReview] = useState(null)
	const { data: session } = useSession()
	const { pokemon } = useInput()
	const { id } = data

	const favoriteIcon = favorite ? (
		<MdFavorite color='#E53E3E' />
	) : (
		<MdFavoriteBorder />
	)

	const favoriteClickHandler = async () => {
		if (!session) {
			alert('please login to like')
			return
		}
		setFavorite(!favorite)

		const data = {
			fav: favorite ? numberOfFavorites - 1 : numberOfFavorites + 1,
			pokemonId,
			toggle: favorite
		}

		setNumberOfFavorites(data.fav)
		await axios.put('/api/pokemon', data)
	}

	return (
		<Flex pt={16}>
			<Sidebar id={genId} />
			<chakra.div
				flex={1}
				px='5'
				overflow='auto'
				maxH='calc(100vh - var(--chakra-sizes-16))' //viewheight - navbar height
			>
				<Container
					maxW='container.xl'
					px={{ base: 5, md: 12 }}
					margin='0 auto'
					align='center'
					justify='center'
				>
					<HStack
						align='center'
						justify='space-between'
						mt={5}
						mb={3}
						maxW='xs'
						w='full'
					>
						<NavButton
							id={id === 1 ? 905 : id - 1}
							name={id === 1 ? pokemon[904] : pokemon[id - 2]}
							leftIcon={<ArrowBackIcon />}
						>
							{id === 1
								? capitalFirstLetter(formatNames(pokemon[904]))
								: capitalFirstLetter(formatNames(pokemon[id - 2]))}
						</NavButton>

						<RandomButton size='sm' pokemon={pokemon}>
							Surprise me
						</RandomButton>

						<NavButton
							id={id === 905 ? 1 : id + 1}
							name={id === 905 ? pokemon[0] : pokemon[id]}
							rightIcon={<ArrowForwardIcon />}
						>
							{id === 905
								? capitalFirstLetter(formatNames(pokemon[0]))
								: capitalFirstLetter(formatNames(pokemon[id]))}
						</NavButton>
					</HStack>
					<PokemonPage data={data} />
					<HStack align='center' justify='center' mt={3} maxW='xs'>
						<Button
							leftIcon={favoriteIcon}
							variant='outline'
							w='20%'
							onClick={favoriteClickHandler}
							colorScheme='blue'
						>
							{numberOfFavorites}
						</Button>
						<Button
							leftIcon={<MdOutlineEdit />}
							onClick={session ? onOpen : () => alert('please login to review')}
							colorScheme='blue'
							w='80%'
						>
							Leave a review
						</Button>
					</HStack>

					{allReviews.length === 0 && <Empty pokemonName={pokemonName} />}
					{allReviews.map((review, index) => (
						<ReviewBox
							user={user}
							review={review}
							key={index}
							setAllReviews={setAllReviews}
							onOpen={onOpen}
							setEditReview={setEditReview}
						/>
					))}
					<ReviewModal
						pokemonName={pokemonName}
						isOpen={isOpen}
						onClose={onClose}
						initialRef={initialRef}
						setAllReviews={setAllReviews}
						editReview={editReview}
						setEditReview={setEditReview}
					/>
				</Container>
			</chakra.div>
		</Flex>
	)
}

Pokemon.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>
}

export const getServerSideProps = async context => {
	const { id: genId, pokemon } = context.params

	const names = await getAllPokemonFromGen(genId)

	const exist = names.includes(pokemon)

	if (!exist) {
		return {
			notFound: true
		}
	}

	///////////////////////////////////////////////

	const response = await getPokemon(pokemon)

	const pokemonData = {
		name: pokemon,
		...response
	}

	///////////////////////////////////////////////

	const session = await getSession(context)

	const savedPokemon = await prisma.pokemon.findUnique({
		where: {
			pokemon: pokemon
		},
		select: {
			id: true,
			favorite: true,
			favoritedBy: true
		}
	})

	const reviews = await prisma.review.findMany({
		//return all reviews for the selected pokemond
		where: {
			pokemon: pokemon
		},
		include: {
			//return all fields from user model
			author: true
		}
	})

	const { id, favorite, favoritedBy } = savedPokemon

	if (!session) {
		return {
			props: {
				data: pokemonData,
				pokemonName: pokemon,
				numOfFavorite: favorite,
				reviews: JSON.parse(JSON.stringify(reviews))
			}
		}
	}

	const user = await prisma.user.findUnique({
		where: { email: session.user.email }
	})

	const didUserFavoriteThisPokemon = favoritedBy.some(el => el.id === user.id)

	return {
		props: {
			user: user,
			data: pokemonData,
			pokemonName: pokemon,
			reviews: JSON.parse(JSON.stringify(reviews)),
			numOfFavorite: favorite,
			didUserFavoriteThisPokemon,
			pokemonId: id,
			genId: genId
		}
	}
}

export default Pokemon
