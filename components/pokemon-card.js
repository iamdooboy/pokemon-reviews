import React from 'react'
import { Box, GridItem } from '@chakra-ui/react'
import PokemonInfo from './pokemon-info'

const PokemonCard = React.forwardRef(({ pokemon }, ref) => {
	const content = ref ? (
		<GridItem ref={ref}>
			<Box rounded={8} borderWidth='1px' shadow='lg'>
				<PokemonInfo {...pokemon} />
			</Box>
		</GridItem>
	) : (
		<GridItem>
			<Box rounded={8} borderWidth='1px' shadow='lg'>
				<PokemonInfo {...pokemon} />
			</Box>
		</GridItem>
	)

	return content
})

export default PokemonCard
