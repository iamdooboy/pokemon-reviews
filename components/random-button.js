import React from 'react'
import { Button } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { getPokemonGeneration, getRandomPokemonNum } from '../utils/helpers'

const RandomButton = ({ randomId, pokemon, children, ...props }) => {
	const router = useRouter()
	const onClickHandler = () => {
		if (!randomId) {
			randomId = getRandomPokemonNum()
		}
		const gen = getPokemonGeneration(randomId)
		const name = pokemon[randomId - 1]

		router.push(`/gen/${gen}/${name}`)
	}
	return (
		<Button
			{...props}
			bg='teal.400'
			onClick={onClickHandler}
			fontSize={{ base: 'xs', md: 'md', lg: 'md' }}
			_hover={{
				bg: 'teal.600'
			}}
		>
			{children}
		</Button>
	)
}
export default RandomButton
