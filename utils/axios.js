import axios from 'axios'
import { getPokemonImageUrl } from './helpers'

export const api = axios.create({
	baseURL: 'https://pokeapi.co/api/v2/'
})

export const cyclic = axios.create({
	baseURL: 'https://funny-elk-apron.cyclic.app/api/'
})

export const getPokemon = async pokemon => {
	const { data } = await api.get(`/pokemon/${pokemon}/`)

	const { id, types } = data
	const typesArr = types.map(el => el.type.name)

	const imageData = {
		imageUrl: getPokemonImageUrl(id),
		imageAlt: pokemon
	}

	return { name: pokemon, id, typesArr, ...imageData }
}

export const getDummyPokemon = async (limit, offset) => {
	const res = await api.get(`/pokemon?limit=${limit}&offset=${offset}`)

	const names = res.data.results.map(el => el.name)
	return names
}
