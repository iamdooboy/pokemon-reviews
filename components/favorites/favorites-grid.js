import { SimpleGrid } from '@chakra-ui/react'
import FavoritesGridItem from './favorites-grid-item'
import { useFetchPokemon } from '../../hooks/useFetchPokemon'
import axios from 'axios'
import { FavoritePokemonGridSkeleton } from '../loading/favorite-pokemon-skeleton'

const FavoritesGrid = () => {
	const fetcher = url => axios.get(url).then(res => res.data)

	const key = '/api/pokemon/'

	const options = {
		revalidateIfStale: true,
		revalidateOnFocus: false
	}

	const { data, isLoading, onFav } = useFetchPokemon(key, fetcher, options)

	if (isLoading) return <FavoritePokemonGridSkeleton />

	return (
		<SimpleGrid columns={[2, 3, 6]} spacing={6} py={4}>
			{data.map((el, index) => (
				<FavoritesGridItem key={index} {...el} onFav={onFav} />
			))}
		</SimpleGrid>
	)
}

export default FavoritesGrid
