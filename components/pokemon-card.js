import React from 'react'
import { Box, GridItem } from '@chakra-ui/react'
import PokemonInfo from './pokemon-info'

const PokemonCard = React.forwardRef(({ pokemon }, ref) => {
	const content = ref ? (
		<GridItem ref={ref}>
			<Box
				bg='gray.100'
				bgImage="url('./bg-pokeball.svg')"
				bgPosition='center'
				bgSize='contain'
				bgRepeat='no-repeat'
				_dark={{
					bg: 'gray.800'
				}}
				borderWidth='1px'
				shadow='lg'
			>
				<PokemonInfo {...pokemon} />
			</Box>
		</GridItem>
	) : (
		<GridItem>
			<Box
				bg='gray.100'
				bgImage="url('./bg-pokeball.svg')"
				bgPosition='center'
				bgSize='contain'
				bgRepeat='no-repeat'
				_dark={{
					bg: 'gray.800'
				}}
				borderWidth='1px'
				shadow='lg'
			>
				<PokemonInfo {...pokemon} />
			</Box>
		</GridItem>
	)

	return content
})

export default PokemonCard
