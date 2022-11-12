import ReviewBox from '../pokemon-page/review-box'
import { useFetchReviews } from '../../hooks/useFetchReviews'
import axios from 'axios'

const ReviewList = ({ pokemonName, onOpen, setSelected }) => {
	const fetcher = url =>
		axios
			.get(url, {
				params: {
					pokemon: pokemonName
				}
			})
			.then(res => res.data)

	const key = `/api/reviews/${pokemonName}`

	const { reviews, isLoading } = useFetchReviews(key, fetcher)

	if (isLoading) return <div>loading</div>

	return (
		<>
			{reviews.map((review, index) => (
				<ReviewBox
					key={index}
					{...{ review, setSelected, onOpen, pokemonName }}
				/>
			))}
		</>
	)
}

export default ReviewList
