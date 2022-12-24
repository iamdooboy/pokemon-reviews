import { SimpleGrid } from '@chakra-ui/react'
import { usePokeAPI } from '../../hooks/usePokeAPI'
import { GenPageSkeleton } from '../loading/gen-page-skeleton'
import PokemonGridItem from '../gen-page/pokemon-grid-item'
import { LinkOverlay } from '../../components/link-overlay'
import { useFetchReviews } from '../../hooks/useFetchReviews'
import axios from 'axios'

const PokemonGrid = ({ gen }) => {
	const { fetchAllPokemonFromGen } = usePokeAPI()

	const { data, isLoading: apiLoading } = fetchAllPokemonFromGen(gen)

	//if (apiLoading) return <GenPageSkeleton />

	const fetcher = url => axios.get(url).then(res => res.data)

	const key = `/api/reviews/gen/${gen}`

	const { reviews, isLoading } = useFetchReviews(key, fetcher)

	if (apiLoading || isLoading) return <div>loading</div>

	return (
		<SimpleGrid columns={[2, 3, 3, 6]} spacing={6} py={4}>
			{data.map(({ id, name, image }) => {
				return (
					<LinkOverlay key={id} href={`/gen/${gen}/${name}`}>
						<PokemonGridItem
							id={id}
							pokemonName={name}
							url={image}
							rating={reviews[name] ? reviews[name].rating : 0}
							count={reviews[name] ? reviews[name].count : 0}
						/>
					</LinkOverlay>
				)
			})}
		</SimpleGrid>
	)
}

export default PokemonGrid
