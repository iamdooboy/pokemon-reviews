import React, { useState, useEffect } from 'react'
import { Grid } from '@chakra-ui/react'
import PokemonCard from './pokemon-card'
import useFetch from '../hooks/useFetch'

const PokemonContainer = () => {
	const allPokemon = useFetch(
		'https://pokeapi.co/api/v2/pokemon?limit=18&offset=',
		0
	)

	return (
		<Grid templateColumns='repeat(auto-fill,minmax(180px,1fr))' gap={6} py={4}>
			{allPokemon.map(pokemon => (
				<PokemonCard pokemon={pokemon} />
			))}
		</Grid>
	)
}

export default PokemonContainer
