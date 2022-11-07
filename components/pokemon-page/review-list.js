import ReviewBox from '../pokemon-page/review-box'
import { useReview } from '../../hooks/useReview'

const ReviewList = ({ pokemonName, onOpen, setSelected }) => {
	const { reviews, isLoading, isError, mutate } = useReview(pokemonName, onOpen)

	if (isLoading) return <div>loading</div>

	return (
		<>
			{reviews.map((review, index) => (
				<ReviewBox
					key={index}
					review={review}
					setSelected={setSelected}
					onOpen={onOpen}
					reviews={reviews}
					mutate={mutate}
					pokemonName={pokemonName}
				/>
			))}
		</>
	)
}

export default ReviewList
