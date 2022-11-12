import React from 'react'
import { Box } from '@chakra-ui/react'
import NextImage from 'next/image'

const Psyduck = ({ deg }) => {
	return (
		<>
			<Box
				pos='absolute'
				left='46px'
				bottom='387px'
				zIndex={2}
				transform={`rotate(${deg}deg)`}
			>
				<NextImage src='/left.png' height='3px' width='3px' />
			</Box>
			<Box
				pos='absolute'
				left='108px'
				bottom='393px'
				zIndex={2}
				transform={`rotate(${deg}deg)`}
			>
				<NextImage src='/right.png' height='4px' width='4px' />
			</Box>
			<Box
				pos='absolute'
				left='-70px'
				bottom='71px'
				zIndex={1}
				transform='rotate(31deg)'
				id='anchor'
			>
				<NextImage src='/psyduck.png' height='300px' width='300px' />
			</Box>
		</>
	)
}

export default Psyduck
