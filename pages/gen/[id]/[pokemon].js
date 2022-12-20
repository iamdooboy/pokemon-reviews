import { Container, useDisclosure, Box, SimpleGrid } from '@chakra-ui/react'
import ReviewList from '../../../components/pokemon-page/review-list'
import NavSection from '../../../components/pokemon-page/nav-section'
import ActionButtons from '../../../components/pokemon-page/action-buttons'
import Layout from '../../../components/layout'
import SortSection from '../../../components/pokemon-page/sort-section'
import axios from 'axios'
import { useState } from 'react'
import { cyclic } from '../../../utils/axios'
import PokemonCard from '../../../components/pokemon-page/pokemon-card'
import { usePokeAPI } from '../../../hooks/usePokeAPI'
import { useFetchReviews } from '../../../hooks/useFetchReviews'

const Pokemon = ({ pokemonName }) => {
	const [sortOrder, setSortOrder] = useState(0)
	const { isOpen, onOpen, onClose } = useDisclosure()

	const key = `/api/reviews/${pokemonName}`
	const fetcher = url =>
		axios
			.get(url, {
				params: {
					pokemon: pokemonName
				}
			})
			.then(res => res.data)

	const swrData = {
		pokemon: pokemonName,
		key: `/api/reviews/${pokemonName}`,
		fetcher: url =>
			axios
				.get(url, {
					params: {
						pokemon: pokemonName
					}
				})
				.then(res => res.data)
	}

	const { fetchOnePokemon } = usePokeAPI()
	const { data, isLoading } = fetchOnePokemon(pokemonName)

	const {
		reviews,
		isLoading: reviewsAreLoading,
		calcRatings
	} = useFetchReviews(key, fetcher)

	if (isLoading || reviewsAreLoading) return <div>loading</div>

	const { count, rating } = calcRatings(reviews)

	return (
		<Container
			maxW='container.lg'
			px={{ base: 5, md: 12 }}
			margin='0 auto'
			pt={16}
			maxH='calc(100vh - var(--chakra-sizes-16))' //viewheight - navbar height
		>
			<SimpleGrid
				columns={[1, null, 2]}
				spacing={0}
				h='full'
				maxH='calc(100vh - var(--chakra-sizes-16))'
			>
				<Box align='center' mt={3}>
					<NavSection id={parseInt(data.id)} />
					<PokemonCard data={data} count={count} rating={rating} />
					<ActionButtons onOpen={onOpen} swrData={swrData} />
				</Box>
				<Box align='center' mt={3}>
					<SortSection swrData={swrData} setSortOrder={setSortOrder} />
					<ReviewList
						swrData={swrData}
						isOpen={isOpen}
						onOpen={onOpen}
						onClose={onClose}
						sortOrder={sortOrder}
					/>
				</Box>
			</SimpleGrid>
		</Container>
	)
}

Pokemon.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>
}

export const getServerSideProps = async context => {
	const { id, pokemon } = context.params

	const names = await cyclic
		.get(`/gen/${id}`)
		.then(res => res.data.map(el => el.name))

	if (!names.includes(pokemon)) {
		return {
			notFound: true
		}
	}

	return {
		props: {
			pokemonName: pokemon,
			gen: id
		}
	}
}

export default Pokemon
