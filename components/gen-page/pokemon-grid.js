import { SimpleGrid } from '@chakra-ui/react'
import { usePokeAPI } from '../../hooks/usePokeAPI'
import { GenPageSkeleton } from '../loading/gen-page-skeleton'
import PokemonGridItem from '../gen-page/pokemon-grid-item'

const PokemonGrid = ({ gen }) => {
	const [_, fetchAllPokemon] = usePokeAPI()

	const { data: names, isLoading } = fetchAllPokemon(gen)

	if (isLoading) return <GenPageSkeleton />

	return (
		<SimpleGrid columns={[2, 3, 3, 6]} spacing={6} py={4}>
			{names.map(name => (
				<PokemonGridItem key={name} pokemonName={name} gen={gen} />
			))}
		</SimpleGrid>
	)
}

export default PokemonGrid
