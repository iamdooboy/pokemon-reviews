import React from 'react'
import { SimpleGrid } from '@chakra-ui/react'
import FavoritesGridItem from './favorites-grid-item'

const FavoritesGrid = ({ data }) => {
	return (
		<SimpleGrid columns={[2, 3, 6]} spacing={6} py={4}>
			{data.map((el, index) => (
				<FavoritesGridItem key={index} {...el} />
			))}
		</SimpleGrid>
	)
}

export default FavoritesGrid
