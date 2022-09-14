import { useState, useEffect } from 'react'
import axios from 'axios'

const useFetch = (url, offset) => {
	const [pokemon, setPokemon] = useState([])

	useEffect(() => {
		const getData = async () => {
			try {
				const res = await axios.get(url + offset)
				const {
					data: { results }
				} = res

				const arr = []
				await Promise.all(
					results.map(async ({ name }) => {
						const { data } = await axios.get(
							`https://pokeapi.co/api/v2/pokemon/${name}`
						)
						const reviews = {
							reviewCount: 34,
							rating: 4
						}
						const { id, types } = data

						let idString = id.toString().padStart(3, '0')

						const imageData = {
							imageUrl: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${idString}.png`,
							imageAlt: name
						}
						arr[data.id] = { name, id, types, ...reviews, ...imageData }
					})
				)
				arr.shift() //remove first element (undefined) from array
				setPokemon(arr)
			} catch (error) {
				console.log(error)
			}
		}

		getData()
	}, [])

	return pokemon
}

export default useFetch
