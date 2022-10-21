import { useState, useEffect, useRef } from 'react'
import { getPokemonGeneration, isNumber } from '../utils/helpers'
import { getAllPokemonNames } from '../utils/axios'
import { useRouter } from 'next/router'

export const useInput = closeModal => {
	const [pokemon, setPokemon] = useState([])
	const [filteredList, setFilteredList] = useState([])
	const [activeIndex, setActiveIndex] = useState(0)
	const log = useRef(true)

	const router = useRouter()

	useEffect(() => {
		if (log.current) {
			const fetchData = async () => {
				const res = await getAllPokemonNames()
				setPokemon(res)
			}
			fetchData()
		}

		return () => {
			log.current = false
		}
	}, [])

	const onChangeHandler = e => {
		setActiveIndex(0)
		const input = e.target.value

		//when input field is empty
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