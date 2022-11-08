import { useState } from 'react'
import { getPokemonGeneration, isNumber } from '../utils/helpers'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { api } from '../utils/axios'

export const useInput = closeModal => {
	const { data: pokemon } = useSWR('/pokemon?limit=905', () =>
		api
			.get('/pokemon?limit=905&offset=0')
			.then(res => res.data.results.map(el => el.name))
	)

	const [filteredList, setFilteredList] = useState([])
	const [activeIndex, setActiveIndex] = useState(0)

	const router = useRouter()

	const onChangeHandler = e => {
		setActiveIndex(0)
		const input = e.target.value

		if (input.length === 0) {
			setFilteredList([])
			return
		}

		if (isNumber(input)) {
			if (input <= 0) {
				return
			}
			setFilteredList([pokemon[input - 1]])
		} else {
			const searchItem = input.toLowerCase() //auto capitalize on mobile
			const copy = [...pokemon]
			const results = copy.sort().filter(pkmn => pkmn.startsWith(searchItem))
			results.splice(5, copy.length)
			setFilteredList(results)
		}
	}

	const onKeyDownHandler = e => {
		if (e.key === 'Enter') {
			onCloseHandler()
			const highlightedPokemon = filteredList[activeIndex]
			const pokemonId = pokemon.indexOf(highlightedPokemon) + 1
			const gen = getPokemonGeneration(pokemonId)
			router.push(`/gen/${gen}/${highlightedPokemon}`)
		} else if (e.key === 'ArrowUp') {
			if (activeIndex === 0) {
				return
			}
			setActiveIndex(activeIndex - 1)
		} else if (e.key === 'ArrowDown') {
			if (activeIndex === filteredList.length - 1) {
				return
			}
			setActiveIndex(activeIndex + 1)
		}
	}

	const onCloseHandler = () => {
		if (closeModal) {
			closeModal()
		}
		setActiveIndex(0)
		setFilteredList([])
	}

	return {
		pokemon,
		filteredList,
		activeIndex,
		setActiveIndex,
		onChangeHandler,
		onKeyDownHandler,
		onCloseHandler
	}
}
