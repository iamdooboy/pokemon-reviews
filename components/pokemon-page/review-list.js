import ReviewBox from '../pokemon-page/review-box'
import ReviewModal from './review-modal'
import { useFetchReviews } from '../../hooks/useFetchReviews'
import { useState, useRef } from 'react'
import { ReviewBoxSkeleton } from '../loading/review-box-skeleton'
import { VStack, Flex } from '@chakra-ui/react'
import { capitalFirstLetter, formatNames } from '../../utils/helpers'

const Empty = ({ pokemon }) => {
	const name = capitalFirstLetter(formatNames(pokemon))
	return (
		<Flex
			maxW='sm'
			rounded={8}
			borderWidth={1}
			align='center'
			justify='center'
			bg='rgba(17, 25, 40, 0.75)'
			w='full'
			h={20}
		>
			Be the first to review {name}!
		</Flex>
	)
}

const ReviewList = props => {
	const { swrData, onOpen, sortOrder } = props
	const { pokemon, key, fetcher } = swrData

	const [selected, setSelected] = useState({ description: '', rating: 0 })
	const initialRef = useRef()

	const {
		reviews: reviewsData,
		isLoading,
		create,
		update,
		remove,
		like,
		sort
	} = useFetchReviews(key, fetcher)

	if (isLoading) return <ReviewBoxSkeleton />

	const { count, average } = reviewsData
	sort(sortOrder)

	return (
		<VStack mb={3}>
			{reviewsData.reviews.length === 0 && <Empty pokemon={pokemon} />}
			{reviewsData.reviews.map((review, index) => (
				<ReviewBox
					key={index}
					{...reviewsData}
					review={review}
					setSelected={setSelected}
					onOpen={onOpen}
					remove={remove}
					like={like}
				/>
			))}
			<ReviewModal
				{...props}
				count={count}
				average={average}
				initialRef={initialRef}
				selected={selected}
				setSelected={setSelected}
				create={create}
				update={update}
			/>
		</VStack>
	)
}

export default ReviewList
