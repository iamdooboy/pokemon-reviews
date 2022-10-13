import { useState } from 'react'
import { useSession } from 'next-auth/react'
import axios from 'axios'

export const useFavorite = (type, id, numOfFavorite, didUserFavorite) => {
	const [numberOfFavorites, setNumberOfFavorites] = useState(numOfFavorite)
	const [favorite, setFavorite] = useState(didUserFavorite)
	const { data: session } = useSession()

	const favoriteClickHandler = async () => {
		if (!session) {
			alert('please login to like')
			return
		}
		setFavorite(!favorite)

		const data = {
			fav: favorite ? numberOfFavorites - 1 : numberOfFavorites + 1,
			id,
			toggle: favorite
		}

		setNumberOfFavorites(data.fav)

		if (type === 'pokemon') {
			await axios.put('/api/pokemon', data)
		} else {
			await axios.put('/api/reviews', data)
		}
	}

	return { favoriteClickHandler, numberOfFavorites, favorite }
}
