'use client'

import { chakra, Container } from '@chakra-ui/react'

export default function PokemonLayout({ children }) {
	return (
		<chakra.div
			flex={1}
			px='5'
			overflow='auto'
			maxH='calc(100vh - var(--chakra-sizes-16))' //viewheight - navbar height
		>
			<Container
				maxW='container.xl'
				px={{ base: 5, md: 12 }}
				margin='0 auto'
				align='center'
				justify='center'
			>
				{children}
			</Container>
		</chakra.div>
	)
}
