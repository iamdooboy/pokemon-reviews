import { SimpleGrid } from '@chakra-ui/react'
import { usePokeAPI } from '../../hooks/usePokeAPI'
import { GenPageSkeleton } from '../loading/gen-page-skeleton'
import PokemonGridItem from '../gen-page/pokemon-grid-item'
import { LinkOverlay } from '../../components/link-overlay'

const PokemonGrid = ({ gen }) => {
	const { fetchAllPokemonFromGen } = usePokeAPI()

	const { data, isLoading } = fetchAllPokemonFromGen(gen)

	if (isLoading) return <GenPageSkeleton />

	return (
		<SimpleGrid columns={[2, 3, 3, 6]} spacing={6} py={4}>
			{data.map(({ id, name, image }) => (
				<LinkOverlay key={id} href={`/gen/${gen}/${name}`}>
					<PokemonGridItem id={id} pokemonName={name} url={image} />
				</LinkOverlay>
			))}
		</SimpleGrid>
	)
}

export default PokemonGrid
