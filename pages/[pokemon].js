import React from 'react'
import { getPokemonName } from '../utils/axios'

const Pokemon = ({ data }) => {
	return <div>{data}</div>
}

export const getServerSideProps = async ({ params }) => {
	const { pokemon } = params
	const allPokemon = await getPokemonName()

	if (!allPokemon.includes(pokemon)) {
		return {
			notFound: true
		}
	}

	return {
		props: {
			data: pokemon
		}
	}
}

export default Pokemon
