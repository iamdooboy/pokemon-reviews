import React from 'react'
import TopHalf from './top-half'
import BottomHalf from './bottom-half'
import { Box, Divider } from '@chakra-ui/react'

const PokemonCardLarge = ({ data }) => {
	return (
		<Box
			maxW='xs'
			rounded={8}
			borderWidth={1}
			align='center'
			mx='auto'
			bg='rgba(17, 25, 40, 0.75)'
		>
			<TopHalf data={data} />
			<Divider pt={4} />
			<BottomHalf />
		</Box>
	)
}

export default PokemonCardLarge
