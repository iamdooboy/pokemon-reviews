import React from 'react'
import { getPokemon, getPokemonName } from '../utils/axios'
import PokemonCardLarge from '../components/pokemon-page/pokemon-card-lg'
import { Container, Button } from '@chakra-ui/react'
import CommentBox from '../components/pokemon-page/comments/comment-box'
import CommentModal from '../components/pokemon-page/comments/add-comment-modal'

const Pokemon = ({ data }) => {
	return (
		<Container
			maxW='container.md'
			p={{ base: 5, md: 12 }}
			margin='0 auto'
			align='center'
		>
			<PokemonCardLarge data={data} />
			<CommentModal />
			<CommentBox />
			<CommentBox />
		</Container>
	)
}

export const getServerSideProps = async ({ params }) => {
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
			data: pokemonData
		}
	}
}

export default Pokemon
