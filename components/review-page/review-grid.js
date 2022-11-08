import React, { useState } from 'react'
import { SimpleGrid } from '@chakra-ui/react'
import ReviewGridItem from './review-grid-item'
import { useMutation } from '../../hooks/useMutation'
import ReviewModal from '../pokemon-page/review-modal'

const ReviewGrid = ({ reviews }) => {
	const [pokemonName, setPokemonName] = useState('')

	const {
		initialRef,
		isOpen,
		onClose,
		onEdit,
		onDelete,
		allReviews,
		editReview,
		onSubmit
	} = useMutation(reviews, pokemonName)

	return (
		<SimpleGrid columns={[1, 2, 2, 3]} spacing={4} py={4}>
			{allReviews.map(review => (
				<ReviewGridItem
					key={review.id}
					{...review}
					{...{ onEdit, onDelete, setPokemonName }}
				/>
			))}
			<ReviewModal
				{...{ initialRef, isOpen, onClose, editReview, onSubmit, pokemonName }}
			/>
		</SimpleGrid>
	)
}

export default ReviewGrid
