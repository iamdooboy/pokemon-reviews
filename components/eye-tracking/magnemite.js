import React from 'react'
import { Box } from '@chakra-ui/react'
import NextImage from 'next/image'

const Magnemite = ({ deg }) => {
	return (
		<>
			<Box
				pos='absolute'
				left='764px'
				top='156px'
				zIndex={2}
				transform={`rotate(${deg}deg)`}
			>
				<NextImage src='/eye.png' height='4px' width='4px' />
			</Box>

			<Box
				pos='absolute'
				left='625px'
				top='14px'
				zIndex={1}
				transform='rotate(-10deg)'
				id='anchor'
			>
				<NextImage src='/magnemite.png' height='300px' width='300px' />
			</Box>
		</>
	)
}

export default Magnemite
