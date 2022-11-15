import useSWR from 'swr'
import axios from 'axios'

export const useFetchPokemon = (key, fetcher, swrOptions) => {
	const { data, mutate } = useSWR(key, fetcher, swrOptions)

	let options = {
		rollbackOnError: true,
		populateCache: true,
		revalidate: false
	}

	const updateFn = async newData => {
		const res = await axios.put(key, newData).then(res => res.data)

		if (!swrOptions.revalidateOnFocus) {
			const updatedData = data.map(el => {
				if (el.id === res.id) {
					return res
				}
				return el
			})

			return updatedData
		}

		return res
	}

	const onFavorite = selected => {
		const { favorite, favoritedByCurrentUser, id } = selected

		const newData = {
			id,
			favorite: favoritedByCurrentUser ? favorite - 1 : favorite + 1,
			favoritedByCurrentUser: !favoritedByCurrentUser
		}

		options = {
			optimisticData: newData,
			...options
		}

		mutate(updateFn(newData), options)
	}

	const onFav = obj => {
		const { id, favorite, favoritedByCurrentUser } = obj

		const newData = {
			id,
			favorite: favoritedByCurrentUser ? favorite - 1 : favorite + 1,
			favoritedByCurrentUser: !favoritedByCurrentUser
		}

		const optimisticData = data.map(el => {
			if (el.id === id) {
				return { ...el, ...newData }
			}
			return el
		})

		options = {
			optimisticData,
			populateCache: false,
			...options
		}

		mutate(updateFn(newData), options)
	}

	return {
		data,
		isLoading: !data,
		onFavorite,
		onFav
	}
}
