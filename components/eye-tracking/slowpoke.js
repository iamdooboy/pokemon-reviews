import React from 'react'
import { Box } from '@chakra-ui/react'
import NextImage from 'next/image'

const Slowpoke = ({ deg }) => {
	return (
		<>
			<Box
				pos='absolute'
				left='270px'
				bottom='246px'
				zIndex={2}
				transform={`rotate(${deg}deg)`}
			>
				<NextImage src='/slowpoke_left.png' height='3px' width='3px' />
			</Box>

			<Box
				pos='absolute'
				left='324px'
				bottom='263px'
				zIndex={2}
				transform={`rotate(${deg}deg)`}
			>
				<NextImage src='/slowpoke_right.png' height='3px' width='3px' />
			</Box>
			<Box
				pos='absolute'
				left='-29px'
				bottom='104px'
				zIndex={1}
				transform='rotate(-10deg)'
				id='anchor'
			>
				<NextImage src='/slowpoke.png' height='400px' width='400px' />
			</Box>
		</>
	)
}

export default Slowpoke
