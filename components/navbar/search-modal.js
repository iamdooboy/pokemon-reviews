import React, { useState, useEffect, useRef } from 'react'
import { getPokemonName } from '../../utils/axios'
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
				const res = await getPokemonName()
				setPokemon(res)
			}
			fetchData()
		}

		return () => {
			log.current = false
		}
	}, [])

	const onCloseHandler = () => {
		setActiveIndex(0)
		setFilteredList([])
		onClose()
	}

	const onChangeHandler = e => {
		setActiveIndex(0)
		const searchItem = e.target.value.toLowerCase()
		if (searchItem.length === 0) {
			setFilteredList([])
			return
		}
		const results = pokemon.sort().filter(po => po.startsWith(searchItem))
		setFilteredList(results)
	}

	const onKeyDownHandler = e => {
		if (e.key === 'Enter') {
			router.push(`/${filteredList[activeIndex]}`)
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
								placeholder='Search by name or National Pokédex number'
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
