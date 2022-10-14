import React from 'react'
import { Button, Box, color } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { getPokemonGeneration } from '../utils/helpers'

const RandomButton = ({ pokemon, children, ...props }) => {
	const router = useRouter()
	const onClickHandler = () => {
		const min = Math.ceil(1)
		const max = Math.floor(905)

		const randomId = Math.floor(Math.random() * (max - min + 1) + min) //inclusive min and max
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
