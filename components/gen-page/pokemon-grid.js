import { SimpleGrid } from '@chakra-ui/react'
import PokemonGridItem from '../gen-page/pokemon-grid-item'
import { LinkOverlay } from '../../components/link-overlay'
import useSWR from 'swr'

const PokemonGrid = ({ gen }) => {
	const { data } = useSWR(`/gen/${gen}`)

	return (
		<SimpleGrid columns={[2, 3, 3, 6]} spacing={6} py={4}>
			{data.map(({ name }) => (
				<LinkOverlay key={name} href={`/gen/${gen}/${name}`}>
					<PokemonGridItem name={name} />
				</LinkOverlay>
			))}
		</SimpleGrid>
	)
}

export default PokemonGrid
