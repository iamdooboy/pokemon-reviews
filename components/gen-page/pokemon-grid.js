import { SimpleGrid } from '@chakra-ui/react'
import PokemonGridItem from '../gen-page/pokemon-grid-item'
import { LinkOverlay } from '../../components/link-overlay'
import useSWR from 'swr'
import { api } from '../../utils/axios'
import { getLimitAndOffset } from '../../utils/helpers'

const PokemonGrid = ({ gen }) => {
	const { limit, offset } = getLimitAndOffset(gen)

	const fetcher = () =>
		api
			.get(`/pokemon?limit=${limit}&offset=${offset}`)
			.then(res => res.data.results)

	const options = {
		revalidateIfStale: false,
		revalidateOnFocus: false,
		revalidateOnReconnect: false
	}

	const { data } = useSWR(`/gen/${gen}`, fetcher, options)

	return (
		<SimpleGrid columns={[2, 3, 3, 6]} spacing={6} py={4}>
			{data?.map(({ name }) => (
				<LinkOverlay key={name} href={`/gen/${gen}/${name}`}>
					<PokemonGridItem pokemonName={name} />
				</LinkOverlay>
			))}
		</SimpleGrid>
	)
}

export default PokemonGrid
