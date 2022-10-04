import React from 'react'
import NextLink from 'next/link'
import { SimpleGrid, Link } from '@chakra-ui/react'
import PokemonGridItem from '../gen-page/pokemon-grid-item'

const PokemonGrid = ({ data }) => {
	const LinkOverlay = ({ href, children }) => {
		return (
			<NextLink href={href} passHref>
				<Link _hover={{ textDecoration: 'none' }}>{children}</Link>
			</NextLink>
		)
	}
	return (
		<SimpleGrid columns={[2, 3, 6]} spacing={6} py={4} h='100vh'>
			{data.map((pokemon, index) => (
				<LinkOverlay href={`/gen/${pokemon.gen}/${pokemon.name}`} key={index}>
					<PokemonGridItem {...pokemon} />
				</LinkOverlay>
			))}
		</SimpleGrid>
	)
}

export default PokemonGrid
