import { useTest } from './useTest'
import { useState } from 'react'

export const useLikeTest = (review, key, fetcher) => {
	const { onMutate } = useTest(key, fetcher)

	const [favByUser, setFavByUser] = useState(review.favoritedByCurrentUser)
	const [numOfFav, setNumOfFav] = useState(review.favorite)

	const onLike = review => {
		const data = {
			id: review.id,
			favorite: favByUser ? numOfFav - 1 : numOfFav + 1,
			favoritedByCurrentUser: !favByUser,
			api: 'PUT_REVIEW_LIKES',
			pokemon: review.pokemon
		}

		onMutate(data)

		setNumOfFav(data.favorite)
		setFavByUser(data.favoritedByCurrentUser)
	}

	return { onLike }
}
