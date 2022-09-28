import axios from 'axios'

export const api = axios.create({
	baseURL: 'https://pokeapi.co/api/v2/'
})

export const getPokemonName = async () => {
	const res = await api.get('/pokemon?limit=905&offset=0')

	const names = res.data.results.map(el => el.name)
	return names
}

export const getPokemon = async pokemon => {
	const { data } = await api.get(`/pokemon/${pokemon}`)

	const { id, types } = data
	const typesArr = types.map(el => el.type.name)

	let paddedId = id.toString().padStart(3, '0')

	const imageData = {
		imageUrl: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedId}.png`,
		imageAlt: pokemon
	}

	return { id, typesArr, ...imageData }
}

export const getPokemonPage = async (offset = 0, options = {}) => {
	const response = await api.get(`/pokemon?limit=24&offset=${offset}`, options)

	const arr = await Promise.all(
		response.data.results.map(async ({ name }) => {
			const { data } = await api.get(`/pokemon/${name}`)
			const reviews = {
				reviewCount: Math.floor(Math.random() * 100),
				rating: Math.floor(Math.random() * 5)
			}
			const { id, types } = data
			let paddedId = id.toString().padStart(3, '0')
			const imageData = {
				imageUrl: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedId}.png`,
				imageAlt: name
			}
			return { name, id, types, ...reviews, ...imageData }
		})
	)
	return arr
}

export const getDummyPokemon = async (limit, offset) => {
	const res = await api.get(`/pokemon?limit=${limit}&offset=${offset}`)

	const names = res.data.results.map(el => el.name)
	return names
}
