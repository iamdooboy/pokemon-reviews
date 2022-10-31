import React from 'react'
import { SimpleGrid } from '@chakra-ui/react'
import PokemonGridItem from '../gen-page/pokemon-grid-item'
import { LinkOverlay } from '../../components/link-overlay'

const PokemonGrid = ({ data }) => {
	return (
		<SimpleGrid columns={[2, 3, 3, 6]} spacing={6} py={4}>
			{data.map((pokemon, index) => (
				<LinkOverlay href={`/gen/${pokemon.gen}/${pokemon.name}`} key={index}>
					<PokemonGridItem {...pokemon} />
				</LinkOverlay>
			))}
		</SimpleGrid>
	)
}

export default PokemonGrid
