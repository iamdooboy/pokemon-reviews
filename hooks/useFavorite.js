import { useState } from 'react'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import useSWR from 'swr'

export const useFavorite = (pokemon, favByUser) => {
	const { data: session } = useSession()
	const { data: pokemonData, mutate } = useSWR(`/api/pokemon/${pokemon}`)

	if (!pokemonData) return <div>loading</div>
	const { id, favorite } = pokemonData

	const [favoritedByUser, setFavoritedByUser] = useState(favByUser)

	const favoriteClickHandler = async () => {
		if (!session) {
			alert('please login to like')
			return
		}

		setFavoritedByUser(!favoritedByUser)

		const data = {
			numberOfFavorites: favoritedByUser ? favorite - 1 : favorite + 1,
			id,
			toggle: favoritedByUser
		}

		const newData = { ...pokemonData, favorite: data.numberOfFavorites }

		const options = {
			optimisticData: newData,
			rollbackOnError: true,
			populateCache: true,
			revalidate: false
		}

		mutate(updateFn(data), options)
	}

	const updateFn = async data =>
		await axios.put('/api/pokemon', data).then(res => res.data)

	return {
		favoriteClickHandler,
		favoritedByUser,
		pokemonData
	}
}
