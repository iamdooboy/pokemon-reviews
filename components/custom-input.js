import React from 'react'
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'

const CustomInput = ({ boxSize, size, bg, rounded, ...props }) => {
	return (
		<InputGroup size={size} bg={bg} rounded={rounded}>
			<InputLeftElement pointerEvents='none' position='relative' zIndex={0}>
				<SearchIcon boxSize={boxSize} />
			</InputLeftElement>
			<Input variant='unstyled' placeholder='Arceus, 493' {...props} />
		</InputGroup>
	)
}

export default CustomInput
