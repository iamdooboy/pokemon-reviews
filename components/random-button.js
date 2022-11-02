import React from 'react'
import { Button } from '@chakra-ui/react'

const RandomButton = ({ children, ...props }) => {
	return (
		<Button
			{...props}
			bg='teal.400'
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
