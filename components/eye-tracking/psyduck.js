import React from 'react'
import { Box } from '@chakra-ui/react'
import NextImage from 'next/image'

const Psyduck = ({ deg }) => {
	return (
		<>
			<Box
				pos='absolute'
				left='80px'
				bottom='194px'
				zIndex={2}
				transform={`rotate(${deg}deg)`}
			>
				<NextImage src='/left.png' height='8px' width='8px' />
			</Box>
			<Box
				pos='absolute'
				left='176px'
				bottom='194px'
				zIndex={2}
				//transform={`rotate(${deg}deg)`}
			>
				<NextImage src='/right.png' height='8px' width='8px' />
			</Box>
			<Box
				//pos='absolute'
				// left='-70px'
				// bottom='71px'
				zIndex={1}
				id='anchor'
			>
				<NextImage src='/psyduck.png' height='300px' width='300px' />
			</Box>
		</>
	)
}

export default Psyduck
