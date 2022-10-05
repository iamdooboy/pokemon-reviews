import axios from 'axios'

export const api = axios.create({
	baseURL: 'https://pokeapi.co/api/v2/'
})

export const getAllPokemonNames = async () => {
	const res = await api.get('/pokemon?limit=905&offset=0')

	const names = res.data.results.map(el => el.name)
	return names
}

export const getAllPokemonFromGen = async gen => {
	const options = getLimitAndOffset(gen)

	const res = await api.get(
		`/pokemon?limit=${options.limit}&offset=${options.offset}`
	)

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

const getLimitAndOffset = gen => {
	switch (gen) {
		case '1':
			return { limit: 151, offset: 0, gen: 1 }
		case '2':
			return { limit: 100, offset: 151, gen: 2 }
		case '3':
			return { limit: 135, offset: 251, gen: 3 }
		case '4':
			return { limit: 107, offset: 386, gen: 4 }
		case '5':
			return { limit: 156, offset: 493, gen: 5 }
		case '6':
			return { limit: 72, offset: 649, gen: 6 }
		case '7':
			return { limit: 88, offset: 721, gen: 7 }
		case '8':
			return { limit: 96, offset: 809, gen: 8 }
		default:
			return { limit: 151, offset: 0, gen: 1 }
	}
}

export const getPokemonGenPage = async gen => {
	const options = getLimitAndOffset(gen)

	const response = await api.get(
		`/pokemon?limit=${options.limit}&offset=${options.offset}`
	)

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
			return { name, id, types, gen: options.gen, ...reviews, ...imageData }
		})
	)
	return arr
}

export const getDummyPokemon = async (limit, offset) => {
	const res = await api.get(`/pokemon?limit=${limit}&offset=${offset}`)

	const names = res.data.results.map(el => el.name)
	return names
}
