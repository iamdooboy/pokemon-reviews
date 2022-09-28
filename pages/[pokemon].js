import { useRef, useState, useEffect } from 'react'
import { getPokemon, getPokemonName } from '../utils/axios'
import { Container, Button, HStack, Box } from '@chakra-ui/react'
import CommentBox from '../components/review-page/reviews/review-box'
import ReviewModal from '../components/review-page/reviews/add-review-modal'
import { useDisclosure } from '@chakra-ui/react'
import PokemonCardLarge from '../components/review-page/pokemon-card-large'
import { MdFavoriteBorder, MdOutlineEdit, MdFavorite } from 'react-icons/md'
import prisma from '../lib/prisma'
import axios from 'axios'
import { useSession } from 'next-auth/react'

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
	reviews = [],
	data,
	pokemonName,
	numOfFavorite = 0,
	pokemonId,
	favoritedBy
}) => {
	const { data: session, status } = useSession()

	const initialRef = useRef()
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [allReviews, setAllReviews] = useState(reviews)
	const [numberOfFavorites, setNumberOfFavorites] = useState(numOfFavorite)
	const [favorite, setFavorite] = useState()
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		if (!session) {
			setFavorite(false)
		} else {
			setLoading(true)
			axios
				.get('/api/session')
				.then(({ data }) => {
					const didUserFavoriteThisPokemon = favoritedBy.some(
						el => el.id === data
					)
					setFavorite(didUserFavoriteThisPokemon)
				})
				.catch(e => alert(`Getting data failed: ${e.message}`))
				.finally(() => setLoading(false))
		}

		// const getData = async () => {
		// 	const { data } = await axios.get('/api/session')
		// 	const didUserFavoriteThisPokemon = favoritedBy.some(el => el.id === data)
		// 	setFavorite(didUserFavoriteThisPokemon)
		// }
		// setLoading(true)
		// getData()
		// setLoading(false)
	}, [])

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
		<Container
			maxW='container.md'
			p={{ base: 5, md: 12 }}
			margin='0 auto'
			align='center'
			justify='center'
		>
			<PokemonCardLarge data={data} />
			<HStack align='center' justify='center' mt={3} maxW='xs'>
				<Button
					isLoading={loading}
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

			<ReviewModal
				pokemonName={pokemonName}
				isOpen={isOpen}
				onClose={onClose}
				initialRef={initialRef}
				setAllReviews={setAllReviews}
			/>
			{allReviews.length === 0 && <Empty pokemonName={pokemonName} />}
			{allReviews.map((review, index) => (
				<CommentBox review={review} key={index} />
			))}
		</Container>
	)
}

export const getServerSideProps = async context => {
	const { pokemon } = context.params

	// const savedPokemon = await prisma.pokemon.create({
	// 	data: {
	// 		pokemon: pokemon,
	// 		favoritedBy: {}
	// 	}
	// })

	const savedPokemon = await prisma.pokemon.findFirst({
		where: {
			pokemon: pokemon
		},
		include: {
			favoritedBy: true
		}
	})

	console.log(savedPokemon)

	const { id, favorite, favoritedBy } = savedPokemon

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

	const allPokemon = await getPokemonName()

	if (!allPokemon.includes(pokemon)) {
		return {
			notFound: true
		}
	}

	const response = await getPokemon(pokemon)

	const pokemonData = {
		name: pokemon,
		...response
	}

	return {
		props: {
			data: pokemonData,
			pokemonName: pokemon,
			reviews: JSON.parse(JSON.stringify(reviews)),
			numOfFavorite: favorite,
			pokemonId: id,
			favoritedBy: favoritedBy
		}
	}
}

export default Pokemon
