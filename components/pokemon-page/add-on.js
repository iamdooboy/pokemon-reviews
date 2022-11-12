import { Flex, Text } from '@chakra-ui/react'
import { FaThumbsUp, FaRegThumbsUp } from 'react-icons/fa'
import { StarIcon } from '@chakra-ui/icons'
import { useLike } from '../../hooks/useLike'
import { useLikeTest } from '../../hooks/useLikeTest'
import { useFetchReviews } from '../../hooks/useFetchReviews'

const AddOn = ({ pokemonName, review }) => {
	const fetcher = url =>
		axios.get(url, { params: { pokemon: pokemonName } }).then(res => res.data)

	const key = `/api/reviews/${pokemonName}`

	const { isLoading, like } = useFetchReviews(key, fetcher)

	if (isLoading) return <div>loading</div>

	const { favorite, rating, favoritedByCurrentUser } = review

	const favoriteIcon = favoritedByCurrentUser ? (
		<FaThumbsUp color='#38B2AC' />
	) : (
		<FaRegThumbsUp />
	)

	return (
		<Flex align='center' justify='space-between' mt={2}>
			<Flex>
				{Array.from(Array(5).keys()).map((id, index) => {
					index += 1
					return (
						<StarIcon
							boxSize={3}
							key={id}
							mr={2}
							color={index <= rating ? '#f59e0b' : 'gray'}
						/>
					)
				})}
			</Flex>
			<Flex gap={1}>
				<button onClick={() => like(review)}>{favoriteIcon}</button>
				<Text fontSize='sm'>{favorite}</Text>
			</Flex>
		</Flex>
	)

	// //const { onLike } = useLike(review, `/api/reviews/${pokemonName}`)
	// const fetcher = () => axios.get('/api/reviews/')
	// const { onLike } = useLikeTest(review, '/api/reviews/', fetcher)
	// const favoriteIcon = review.favoritedByCurrentUser ? (
	// 	<FaThumbsUp color='#38B2AC' />
	// ) : (
	// 	<FaRegThumbsUp />
	// )
	// return (
	// 	<Flex align='center' justify='space-between' mt={2}>
	// 		<Flex>
	// 			{Array.from(Array(5).keys()).map((id, index) => {
	// 				index += 1
	// 				return (
	// 					<StarIcon
	// 						boxSize={3}
	// 						key={id}
	// 						mr={2}
	// 						color={index <= review.rating ? '#f59e0b' : 'gray'}
	// 					/>
	// 				)
	// 			})}
	// 		</Flex>
	// 		<Flex gap={1}>
	// 			<button onClick={() => onLike(review)}>{favoriteIcon}</button>
	// 			<Text fontSize='sm'>{review.favorite}</Text>
	// 		</Flex>
	// 	</Flex>
	// )
}

export default AddOn
