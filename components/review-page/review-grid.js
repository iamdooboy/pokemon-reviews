import React, { useState, useRef } from 'react'
import { SimpleGrid, useDisclosure } from '@chakra-ui/react'
import ReviewGridItem from './review-grid-item'
import ReviewModal from '../pokemon-page/review-modal'
import axios from 'axios'
import { useFetchReviews } from '../../hooks/useFetchReviews'

const ReviewGrid = () => {
	const [selected, setSelected] = useState({ description: '', rating: 0 })
	const { isOpen, onOpen, onClose } = useDisclosure()
	const initialRef = useRef()

	const fetcher = url => axios.get(url).then(res => res.data)

	const key = '/api/reviews/'

	const { reviews, isLoading, update, like, remove } = useFetchReviews(
		key,
		fetcher
	)

	if (isLoading) return <div>loading</div>

	return (
		<SimpleGrid columns={[1, 2, 2, 3]} spacing={4} py={4}>
			{reviews.map((review, index) => (
				<ReviewGridItem
					key={index}
					review={review}
					like={like}
					remove={remove}
					onOpen={onOpen}
					setSelected={setSelected}
				/>
			))}
			<ReviewModal
				{...{
					isOpen,
					onClose,
					initialRef,
					selected,
					setSelected,
					update
				}}
			/>
		</SimpleGrid>
	)
}

export default ReviewGrid
