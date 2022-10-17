import React from 'react'
import { SimpleGrid, useDisclosure } from '@chakra-ui/react'
import ReviewGridItem from './review-grid-item'

const ReviewGrid = ({ reviews }) => {
	return (
		<SimpleGrid columns={[1, 2, 3]} spacing={4} py={4}>
			{reviews.map(review => (
				<ReviewGridItem key={review.id} {...review} />
			))}
		</SimpleGrid>
	)
}

export default ReviewGrid
