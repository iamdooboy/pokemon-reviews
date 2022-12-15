'use client'

import Link from 'next/link'
import Image from 'next/image'
import {
	SimpleGrid,
	chakra,
	Box,
	GridItem,
	Text,
	PinInputField
} from '@chakra-ui/react'
import { usePokeAPI } from '../../../hooks/usePokeAPI'
import PokemonGridItem from './pokemon-grid-item'

const PokemonGrid = ({ gen }) => {
	const { fetchAllPokemonFromGen } = usePokeAPI()
	const { data, isLoading } = fetchAllPokemonFromGen(gen)
	if (isLoading) return <div>loading</div>
	return (
		<SimpleGrid columns={[2, 3, 3, 6]} spacing={6} py={4}>
			{data.map(({ id, name, image }) => (
				<Link href={`/gen/${gen}/${name}`} key={id}>
					<PokemonGridItem id={id} name={name} image={image} />
				</Link>
			))}
		</SimpleGrid>
	)
}

export default PokemonGrid