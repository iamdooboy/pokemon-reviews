import React, { useState, useRef, useCallback } from 'react'
import { SimpleGrid, Spinner, GridItem, Link } from '@chakra-ui/react'
import NextLink from 'next/link'
import PokemonCard from './pokemon-card'

const PokemonGrid = ({ data }) => {
	const LinkOverlay = ({ href, as, children }) => {
		return (
			<NextLink href={href} as={as} passHref>
				<Link _hover={{ textDecoration: 'none' }}>{children}</Link>
			</NextLink>
		)
	}
	return (
		<SimpleGrid columns={[2, 3, 6]} spacing={6} py={4} h='100vh'>
			{data.map((pokemon, index) => (
				<LinkOverlay
					href={{
						pathname: `/[pokemonid]`,
						query: {
							pokemonid: pokemon.name
						}
					}}
					as={`/${pokemon.name}`}
					key={index}
				>
					<PokemonCard pokemon={pokemon} />
				</LinkOverlay>
			))}
		</SimpleGrid>
	)
}

export default PokemonGrid
