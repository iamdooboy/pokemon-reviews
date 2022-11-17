import ReviewBox from '../pokemon-page/review-box'
import ReviewModal from './review-modal'
import { useFetchReviews } from '../../hooks/useFetchReviews'
import axios from 'axios'
import { useState, useRef } from 'react'
import { ReviewBoxSkeleton } from '../loading/review-box-skeleton'

const ReviewList = ({ pokemonName, isOpen, onOpen, onClose }) => {
	const [selected, setSelected] = useState({ description: '', rating: 0 })
	const initialRef = useRef()

	const fetcher = url =>
		axios
			.get(url, {
				params: {
					pokemon: pokemonName
				}
			})
			.then(res => res.data)

	const key = `/api/reviews/${pokemonName}`

	const { reviews, isLoading, create, update, remove, like } = useFetchReviews(
		key,
		fetcher
	)

	if (isLoading) return <ReviewBoxSkeleton />

	return (
		<>
			{reviews.map((review, index) => (
				<ReviewBox
					key={index}
					{...{ review, setSelected, onOpen, remove, like }}
				/>
			))}

			<ReviewModal
				{...{
					pokemonName,
					isOpen,
					onClose,
					initialRef,
					selected,
					setSelected,
					create,
					update
				}}
			/>
		</>
	)
}

export default ReviewList
