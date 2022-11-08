import useSWR from 'swr'
import { formatNames, capitalFirstLetter } from '../utils/helpers'

export const useFetchPokemon = pokemon => {
	const { data } = useSWR(`/pokemon/${pokemon}`)

	if (!data) return <div>loading</div>

	return {
		...data,
		types: data.typesArr,
		name: capitalFirstLetter(formatNames(pokemon)),
		id: data.id.toString().padStart(3, '0')
	}
}
