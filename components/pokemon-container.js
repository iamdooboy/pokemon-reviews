import React from 'react'
import { Grid } from '@chakra-ui/react'
import PokemonCard from './pokemon-card'

const pokemon = {
  imageUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/596.png',
  imageAlt: 'zoroark',
  name: 'Zoroark',
  id: '#571',
  reviewCount: 34,
  rating: 4
}

const PokemonContainer = () => {
  return (
    <Grid templateColumns='repeat(auto-fill,minmax(210px,1fr))' gap={6} py={4}>
      <PokemonCard pokemon={pokemon} />
      <PokemonCard pokemon={pokemon} />
      <PokemonCard pokemon={pokemon} />
      <PokemonCard pokemon={pokemon} />
      <PokemonCard pokemon={pokemon} />
      <PokemonCard pokemon={pokemon} />
      <PokemonCard pokemon={pokemon} />
      <PokemonCard pokemon={pokemon} />
      <PokemonCard pokemon={pokemon} />
      <PokemonCard pokemon={pokemon} />
    </Grid>
  )
}

export default PokemonContainer
