import { useState, useRef } from 'react'
import { SimpleGrid, useDisclosure, HStack, Heading } from '@chakra-ui/react'
import ReviewGridItem from './review-grid-item'
import ReviewModal from '../pokemon-page/review-modal'
import axios from 'axios'
import { useFetchReviews } from '../../hooks/useFetchReviews'
import { ReviewGridSkeleton } from '../loading/review-box-skeleton'
import SortButtons from '../sort-buttons'
import Empty from '../empty'

const ReviewGrid = () => {
	const [sortOrder, setSortOrder] = useState(0)
	const [selected, setSelected] = useState({ description: '', rating: 0 })
	const { isOpen, onOpen, onClose } = useDisclosure()

	const initialRef = useRef()

	const key = '/api/reviews/'
	const fetcher = url => axios.get(url).then(res => res.data)

	const { reviews, isLoading, update, like, remove, sort } = useFetchReviews(
		key,
		fetcher
	)

	if (isLoading) return <ReviewGridSkeleton />
	sort(sortOrder)

	if (reviews.length === 0)
		return (
			<Empty
				heading='You do not have any reviews posted'
				text='Leave a review and it will show up here'
			/>
		)

	return (
		<>
			{reviews.length > 0 && (
				<HStack align='center' justify='space-between' mt={3} w='full'>
					<Heading as='h5' size='md'>
						{reviews?.length} Reviews
					</Heading>
					<SortButtons setSortOrder={setSortOrder} />
				</HStack>
			)}
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
