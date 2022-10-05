import React, { useState, useEffect, useRef } from 'react'
import { getAllPokemonNames } from '../../utils/axios'
import { SearchIcon } from '@chakra-ui/icons'
import SearchResultList from './search-result-list'
import { useRouter } from 'next/router'
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalBody,
	Input,
	InputGroup,
	InputLeftElement
} from '@chakra-ui/react'

const SearchModal = ({ isOpen, onClose }) => {
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

	const getPokemonGeneration = id => {
		if (id <= 151) {
			return 1
		} else if (id > 151 && id <= 251) {
			return 2
		} else if (id > 251 && id <= 386) {
			return 3
		} else if (id > 386 && id <= 493) {
			return 4
		} else if (id > 493 && id <= 649) {
			return 5
		} else if (id > 649 && id <= 721) {
			return 6
		} else if (id > 721 && id <= 809) {
			return 7
		} else if (id > 809 && id <= 905) {
			return 8
		}
	}

	const isNumber = input => {
		if (input === '') {
			return false
		}
		let regex = new RegExp(/[^0-9]/, 'g')
		return input.match(regex) === null
	}

	const onCloseHandler = () => {
		setActiveIndex(0)
		setFilteredList([])
		onClose()
	}

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
			setFilteredList(results)
		}
	}

	const onKeyDownHandler = e => {
		if (e.key === 'Enter') {
			const highlightedPokemon = filteredList[activeIndex]
			const pokemonId = pokemon.indexOf(highlightedPokemon) + 1
			const gen = getPokemonGeneration(pokemonId)
			router.push(`/gen/${gen}/${highlightedPokemon}`)
			onCloseHandler()
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

	return (
		<>
			<Modal
				scrollBehavior='inside'
				onClose={onCloseHandler}
				isOpen={isOpen}
				size={{ base: 'xs', md: 'md' }}
			>
				<ModalOverlay backdropFilter='blur(2px)' />
				<ModalContent maxHeight='30rem'>
					<ModalBody m={2} px={3}>
						<InputGroup>
							<InputLeftElement pointerEvents='none' position='relative'>
								<SearchIcon color='brand.400' boxSize={5} />
							</InputLeftElement>
							<Input
								onKeyDown={onKeyDownHandler}
								pl={3}
								variant='unstyled'
								placeholder='Search by name or number'
								size='lg'
								onChange={onChangeHandler}
							/>
						</InputGroup>
						{filteredList.map((pokemon, index) => (
							<SearchResultList
								activeIndex={activeIndex}
								setActiveIndex={setActiveIndex}
								key={pokemon}
								pokemon={pokemon}
								onClose={onCloseHandler}
								index={index}
							/>
						))}
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	)
}

export default SearchModal
