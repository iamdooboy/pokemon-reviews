import { useRef, useState } from 'react'
import { getPokemon, getPokemonName } from '../utils/axios'
import { Container, Button, HStack } from '@chakra-ui/react'
import CommentBox from '../components/review-page/reviews/review-box'
import ReviewModal from '../components/review-page/reviews/add-review-modal'
import { useDisclosure } from '@chakra-ui/react'
import { PrismaClient } from '@prisma/client'
import PokemonCardLarge from '../components/review-page/pokemon-card-large'
import { MdFavoriteBorder, MdOutlineEdit, MdFavorite } from 'react-icons/md'
import prisma from '../lib/prisma'
// const prisma = new PrismaClient()

const Pokemon = ({ reviews = [], data, pokemonName }) => {
	const initialRef = useRef()
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [allReviews, setAllReviews] = useState(reviews)
	const [favorite, setFavorite] = useState(false)

	const favoriteIcon = favorite ? (
		<MdFavorite color='#E53E3E' />
	) : (
		<MdFavoriteBorder />
	)

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
					onClick={() => setFavorite(!favorite)}
					colorScheme='blue'
				>
					4
				</Button>
				<Button
					leftIcon={<MdOutlineEdit />}
					onClick={onOpen}
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
			{allReviews.map((review, index) => (
				<CommentBox review={review} key={index} />
			))}
		</Container>
	)
}

export const getServerSideProps = async ({ params }) => {
	const { pokemon } = params

	const reviews = await prisma.review.findMany({
		where: {
			pokemon: pokemon
		},
		orderBy: { createdAt: 'desc' }
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
			reviews: JSON.parse(JSON.stringify(reviews))
		}
	}
}

export default Pokemon
