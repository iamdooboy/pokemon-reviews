import useSWR from 'swr'
import { api } from '../utils/axios'
import {
	getPokemonImageUrl,
	formatNames,
	capitalFirstLetter
} from '../utils/helpers'

export const usePokeAPI = pokemon => {
	const fetcher = url => api.get(url).then(res => res.data)

	const options = {
		revalidateIfStale: false,
		revalidateOnFocus: false,
		revalidateOnReconnect: false
	}

	const { data } = useSWR(`/pokemon/${pokemon}`, fetcher, options)

	if (!data) return false

	const { id, types } = data

	const typesArr = types.map(el => el.type.name)
	const imageUrl = getPokemonImageUrl(id)
	const imageAlt = formatNames(pokemon)
	const formattedName = capitalFirstLetter(formatNames(pokemon))
	const formattedId = id.toString().padStart(3, '0')

	return {
		types: typesArr,
		url: imageUrl,
		alt: imageAlt,
		name: formattedName,
		id: formattedId
	}
}
