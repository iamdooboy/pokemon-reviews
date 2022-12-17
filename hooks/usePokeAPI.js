import useSWRImmutable from 'swr/immutable'
import useSWR from 'swr'
import { cyclic } from '../utils/axios'

export const usePokeAPI = () => {
	const fetchOnePokemon = args => {
		const fetcher = url => cyclic.get(url).then(res => res.data)

		const { data } = useSWRImmutable(`/pokemon/${args}`, fetcher)

		return {
			data,
			isLoading: !data
		}
	}

	const fetchAllPokemon = () => {
		const fetcher = url =>
			cyclic.get(url).then(res => res.data.map(el => el.name))

		const { data } = useSWRImmutable('/pokemon', fetcher)

		return {
			data,
			isLoading: !data
		}
	}

	const fetchAllPokemonFromGen = args => {
		const fetcher = url => cyclic.get(url).then(res => res.data)

		const { data } = useSWR(`/gen/${args}`, fetcher, {
			revalidateIfStale: true,
			revalidateOnFocus: false,
			revalidateOnReconnect: false
		})

		return {
			data,
			isLoading: !data
		}
	}

	return { fetchOnePokemon, fetchAllPokemon, fetchAllPokemonFromGen }
}
