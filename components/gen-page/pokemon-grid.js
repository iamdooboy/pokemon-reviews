import { SimpleGrid } from '@chakra-ui/react'
import PokemonGridItem from '../gen-page/pokemon-grid-item'
import { LinkOverlay } from '../../components/link-overlay'
import { usePokeAPI } from '../../hooks/usePokeAPI'

const PokemonGrid = ({ gen }) => {
	const [_, fetchAllPokemon] = usePokeAPI()

	const { data: names } = fetchAllPokemon(gen)

	return (
		<SimpleGrid columns={[2, 3, 3, 6]} spacing={6} py={4}>
			{names?.map(name => (
				<LinkOverlay key={name} href={`/gen/${gen}/${name}`}>
					<PokemonGridItem pokemonName={name} />
				</LinkOverlay>
			))}
		</SimpleGrid>
	)
}

export default PokemonGrid
