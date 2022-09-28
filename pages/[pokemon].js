import { useRef, useState, useEffect } from 'react'
import { getPokemon, getPokemonName } from '../utils/axios'
import { Container, Button, HStack, Box } from '@chakra-ui/react'
import CommentBox from '../components/review-page/reviews/review-box'
import ReviewModal from '../components/review-page/reviews/add-review-modal'
import { useDisclosure } from '@chakra-ui/react'
import PokemonCardLarge from '../components/review-page/pokemon-card-large'
import { MdFavoriteBorder, MdOutlineEdit, MdFavorite } from 'react-icons/md'
import { prisma } from '../lib/prisma'
import axios from 'axios'
import { getSession, useSession } from 'next-auth/react'

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
	didUserFavoriteThisPokemon = false,
	pokemonId
}) => {
	const initialRef = useRef()
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [allReviews, setAllReviews] = useState(reviews)
	const [numberOfFavorites, setNumberOfFavorites] = useState(numOfFavorite)
	const [favorite, setFavorite] = useState(didUserFavoriteThisPokemon)
	const { data: session, status } = useSession()

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
	const allPokemon = await getPokemonName()

	if (!allPokemon.includes(pokemon)) {
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
			data: pokemonData,
			pokemonName: pokemon,
			reviews: JSON.parse(JSON.stringify(reviews)),
			numOfFavorite: favorite,
			didUserFavoriteThisPokemon,
			pokemonId: id
		}
	}
}

export default Pokemon
