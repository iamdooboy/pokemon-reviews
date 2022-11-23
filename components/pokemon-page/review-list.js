import ReviewBox from '../pokemon-page/review-box'
import ReviewModal from './review-modal'
import { useFetchReviews } from '../../hooks/useFetchReviews'
import axios from 'axios'
import { useState, useRef } from 'react'
import { ReviewBoxSkeleton } from '../loading/review-box-skeleton'
import { Box } from '@chakra-ui/react'
import { capitalFirstLetter, formatNames } from '../../utils/helpers'
import { useAppContext } from '../../context/state'

const Empty = ({ pokemonName }) => {
	const name = capitalFirstLetter(formatNames(pokemonName))
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

const ReviewList = ({ pokemonName, isOpen, onOpen, onClose }) => {
	const { sortOrder } = useAppContext()
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

	const { reviews, isLoading, create, update, remove, like, sortReviews } =
		useFetchReviews(key, fetcher)

	if (isLoading) return <ReviewBoxSkeleton />

	sortReviews(sortOrder)

	return (
		<>
			{reviews.length === 0 && <Empty pokemonName={pokemonName} />}
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
