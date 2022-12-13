import useSWRImmutable from 'swr/immutable'
import { api } from '../utils/axios'
import {
	getPokemonImageUrl,
	formatNames,
	capitalFirstLetter,
	getLimitAndOffset
} from '../utils/helpers'
import axios from 'axios'

export const usePokeAPI = () => {
	const fetchOnePokemon = args => {
		const fetcher = url => api.get(url).then(res => res.data)

		const { data, isLoading } = useSWRImmutable(`/pokemon/${args}`, fetcher)

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
			isLoading,
			formatData
		}
	}

	const fetchAllPokemon = args => {
		const fetcher = () =>
			axios
				.get('https://funny-elk-apron.cyclic.app/api/pokemon')
				.then(res => res.data.map(el => el.name))

		const { data } = useSWRImmutable('/pokemon/', fetcher)

		return {
			data,
			isLoading: !data
		}
	}

	const fetchAllPokemonFromGen = args => {
		// const { limit, offset } = getLimitAndOffset(args)

		// const fetcher = () =>
		// 	api
		// 		.get(`/pokemon?limit=${limit}&offset=${offset}`)
		// 		.then(res => res.data.results.map(el => el.name))

		// const { data, isLoading } = useSWRImmutable(`/gen/${args}`, fetcher)

		const fetcher = () =>
			axios
				.get(`https://funny-elk-apron.cyclic.app/api/gen/${args}`)
				.then(res => res.data)

		const { data, isLoading } = useSWRImmutable(`/gen/${args}`, fetcher)

		return {
			data,
			isLoading
		}
	}

	return { fetchOnePokemon, fetchAllPokemon, fetchAllPokemonFromGen }
}
