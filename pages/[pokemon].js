import { useRef, useState } from 'react'
import { getPokemon, getPokemonName } from '../utils/axios'
import PokemonCardLarge from '../components/pokemon-page/pokemon-card-lg'
import { Container } from '@chakra-ui/react'
import CommentBox from '../components/pokemon-page/comments/comment-box'
import CommentModal from '../components/pokemon-page/comments/add-comment-modal'
import { useDisclosure } from '@chakra-ui/react'
import { PrismaClient } from '@prisma/client'

const Pokemon = ({ reviews = [], data }) => {
	const initialRef = useRef()
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [allReviews, setAllReviews] = useState(reviews)

	return (
		<Container
			maxW='container.md'
			p={{ base: 5, md: 12 }}
			margin='0 auto'
			align='center'
		>
			<PokemonCardLarge data={data} />
			<CommentModal
				isOpen={isOpen}
				onClose={onClose}
				initialRef={initialRef}
				onOpen={onOpen}
				setAllReviews={setAllReviews}
			/>
			{allReviews.map((review, index) => (
				<CommentBox review={review} key={index} />
			))}
		</Container>
	)
}

export const getServerSideProps = async ({ params }) => {
	const prisma = new PrismaClient()
	const reviews = await prisma.review.findMany()

	const { pokemon } = params
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
			reviews: JSON.parse(JSON.stringify(reviews))
		}
	}
}

export default Pokemon
