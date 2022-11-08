import ReviewBox from '../pokemon-page/review-box'
import { useMutation } from '../../hooks/useMutation'

const ReviewList = ({ pokemonName, onOpen, setSelected }) => {
	const { reviews, isLoading } = useMutation(pokemonName)

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
					pokemonName={pokemonName}
				/>
			))}
		</>
	)
}

export default ReviewList
