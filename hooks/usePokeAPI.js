import useSWRImmutable from 'swr/immutable'
import { api } from '../utils/axios'
import {
	getPokemonImageUrl,
	formatNames,
	capitalFirstLetter,
	getLimitAndOffset
} from '../utils/helpers'

export const usePokeAPI = () => {
	const fetchOnePokemon = args => {
		const fetcher = url => api.get(url).then(res => res.data)

		const { data } = useSWRImmutable(`/pokemon/${args}`, fetcher)

		const formatData = apiData => {
			const { id, types } = apiData
			const typesArr = types.map(el => el.type.name)
			const imageUrl = getPokemonImageUrl(id)
			const imageAlt = formatNames(args)
			const formattedName = capitalFirstLetter(formatNames(args))
			const formattedId = id.toString().padStart(3, '0')

			return {
				types: typesArr,
				url: imageUrl,
				alt: imageAlt,
				name: formattedName,
				id: formattedId
			}
		}

		return {
			data,
			isLoading: !data,
			formatData
		}
	}

	const fetchAllPokemon = args => {
		const { limit, offset } = getLimitAndOffset(args)

		const fetcher = () =>
			api
				.get(`/pokemon?limit=${limit}&offset=${offset}`)
				.then(res => res.data.results.map(el => el.name))

		const { data } = useSWRImmutable(`/gen/${args}`, fetcher)

		return {
			data,
			isLoading: !data
		}
	}

	return [fetchOnePokemon, fetchAllPokemon]
}
