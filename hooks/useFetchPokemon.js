import useSWR from 'swr'
import { api } from '../utils/axios'

export const useFetchPokemon = pokemon => {
	const { data, error } = useSWR(`/pokemon/${pokemon}`, () =>
		api.get(`/pokemon/${pokemon}`).then(res => res.data)
	)

	return {
		pokemon: data,
		isLoading: !error && !data,
		isError: error
	}
}
