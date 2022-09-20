import React from 'react'
import { getPokemon, getPokemonName } from '../utils/axios'
import PokemonCardLarge from '../components/pokemon-page/pokemon-card-lg'
import { Container, Button } from '@chakra-ui/react'

const Pokemon = ({ data }) => {
	return (
		<Container
			maxW='container.md'
			p={{ base: 5, md: 12 }}
			margin='0 auto'
			align='center'
		>
			<PokemonCardLarge data={data} />
			<Button w='xs' mt={2}>
				Write a review
			</Button>
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
