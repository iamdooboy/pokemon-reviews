import { useState, useRef } from 'react'
import { SimpleGrid, useDisclosure } from '@chakra-ui/react'
import ReviewGridItem from './review-grid-item'
import ReviewModal from '../pokemon-page/review-modal'
import axios from 'axios'
import { useFetchReviews } from '../../hooks/useFetchReviews'
import { ReviewGridSkeleton } from '../loading/review-box-skeleton'
import SortButtons from '../sort-buttons'

const ReviewGrid = () => {
	const [sortOrder, setSortOrder] = useState(0)
	const [selected, setSelected] = useState({ description: '', rating: 0 })
	const { isOpen, onOpen, onClose } = useDisclosure()

	const initialRef = useRef()

	const key = '/api/reviews/'
	const fetcher = url => axios.get(url).then(res => res.data)

	const { reviews, isLoading, update, like, remove, sortReviews } =
		useFetchReviews(key, fetcher)

	if (isLoading) return <ReviewGridSkeleton />
	sortReviews(sortOrder)

	return (
		<>
			{reviews?.length > 0 && <SortButtons setSortOrder={setSortOrder} />}
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
		</>
	)
}

export default ReviewGrid
