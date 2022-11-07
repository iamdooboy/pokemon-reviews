import axios from 'axios'
import useSWR from 'swr'
import { useReview } from './useReview'
import { useState } from 'react'

export const useLike = (pokemonName, review) => {
	const { onMutate } = useReview(pokemonName)
	const [favByUser, setFavByUser] = useState(review.favoritedByCurrentUser)
	const [numOfFav, setNumOfFav] = useState(review.favorite)

	const onLike = review => {
		const data = {
			id: review.id,
			favorite: favByUser ? numOfFav - 1 : numOfFav + 1,
			favoritedByCurrentUser: !favByUser,
			api: 'PUT_REVIEW_LIKES'
		}

		onMutate(data)

		setNumOfFav(data.favorite)
		setFavByUser(data.favoritedByCurrentUser)
	}

	return { onLike }
}
