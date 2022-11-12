import React, { useState } from 'react'
import { SimpleGrid } from '@chakra-ui/react'
import ReviewGridItem from './review-grid-item'
import { useMutation } from '../../hooks/useMutation'
import ReviewModal from '../pokemon-page/review-modal'
import useSWR from 'swr'
import axios from 'axios'
import { useTest } from '../../hooks/useTest'
const ReviewGrid = () => {
	const fetcher = url => axios.get(url).then(res => res.data)

	//const { reviews } = useMutation('/api/reviews/')
	//const { data: reviews } = useSWR('/api/reviews/', fetcher)

	const { reviews } = useTest('/api/reviews/', fetcher)

	//const [pokemonName, setPokemonName] = useState('')

	// const {
	// 	initialRef,
	// 	isOpen,
	// 	onClose,
	// 	onEdit,
	// 	onDelete,
	// 	allReviews,
	// 	editReview,
	// 	onSubmit
	// } = useMutation(reviews, pokemonName)

	if (!reviews) return <div>loading</div>
	// console.log(reviews)
	// return <div>loading</div>
	return (
		<SimpleGrid columns={[1, 2, 2, 3]} spacing={4} py={4}>
			{reviews.map((review, index) => (
				<ReviewGridItem
					key={index}
					review={review}
					// {...review}
					// {...{ onEdit, onDelete, setPokemonName }}
				/>
			))}
			{/* <ReviewModal
				{...{ initialRef, isOpen, onClose, editReview, onSubmit, pokemonName }}
			/> */}
		</SimpleGrid>
	)
}

export default ReviewGrid
