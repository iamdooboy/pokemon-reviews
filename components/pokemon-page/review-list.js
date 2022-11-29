import ReviewBox from '../pokemon-page/review-box'
import ReviewModal from './review-modal'
import { useFetchReviews } from '../../hooks/useFetchReviews'
import { useState, useRef } from 'react'
import { ReviewBoxSkeleton } from '../loading/review-box-skeleton'
import { Box } from '@chakra-ui/react'
import { capitalFirstLetter, formatNames } from '../../utils/helpers'

const Empty = ({ pokemon }) => {
	const name = capitalFirstLetter(formatNames(pokemon))
	return (
		<Box
			fontWeight='600'
			maxW='xs'
			rounded={8}
			borderWidth={1}
			align='center'
			mt={3}
			mx='auto'
			p={3}
			bg='rgba(17, 25, 40, 0.75)'
		>
			Be the first to review {name}!
		</Box>
	)
}

const ReviewList = ({ swrData, isOpen, onOpen, onClose, sortOrder }) => {
	const { pokemon, key, fetcher } = swrData

	const [selected, setSelected] = useState({ description: '', rating: 0 })
	const initialRef = useRef()

	const { reviews, isLoading, create, update, remove, like, sortReviews } =
		useFetchReviews(key, fetcher)

	if (isLoading) return <ReviewBoxSkeleton />

	sortReviews(sortOrder)

	return (
		<>
			{reviews.length === 0 && <Empty pokemon={pokemon} />}
			{reviews.map((review, index) => (
				<ReviewBox
					key={index}
					{...{ review, setSelected, onOpen, remove, like }}
				/>
			))}

			<ReviewModal
				{...{
					pokemon,
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
