import useSWR from 'swr'
import axios from 'axios'

export const useFetchPokemon = pokemonName => {
	const fetcher = url =>
		axios.get(url, { params: { pokemon: pokemonName } }).then(res => res.data)

	const { data, mutate } = useSWR(`/api/pokemon/${pokemonName}`, fetcher)

	if (!data) return false

	const { favorite, favoritedByCurrentUser, id } = data

	const updateFn = async data => {
		const res = await axios.put('/api/pokemon', data).then(res => res.data)
		return res
	}

	const onClick = () => {
		const newData = {
			id,
			favorite: favoritedByCurrentUser ? favorite - 1 : favorite + 1,
			favoritedByCurrentUser: !favoritedByCurrentUser
		}

		const options = {
			optimisticData: newData,
			rollbackOnError: true,
			populateCache: true,
			revalidate: false
		}

		mutate(updateFn(newData), options)
	}

	return {
		favorite,
		favoritedByCurrentUser,
		onClick
	}
}
