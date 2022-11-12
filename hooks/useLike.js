import { useMutation } from './useMutation'
import { useState } from 'react'

export const useLike = (review, key) => {
	const { onMutate } = useMutation(key)

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
