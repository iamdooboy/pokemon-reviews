import React from 'react'
import { Box, GridItem } from '@chakra-ui/react'
import PokemonInfo from './pokemon-info'

const PokemonGridItem = ({ pokemon }) => {
	return (
		<GridItem>
			<Box rounded={8} borderWidth='1px' shadow='lg'>
				<PokemonInfo {...pokemon} />
			</Box>
		</GridItem>
	)
}

export default PokemonGridItem
