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
		<Box bgGradient='linear(to-r, blue.400, teal.400)' p='1px' rounded='md'>
			<Button {...props} bg='gray.800' onClick={onClickHandler}>
				{children}
			</Button>
		</Box>
	)
}
export default RandomButton
