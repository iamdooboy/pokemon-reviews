import { chakra, Container, Flex, useDisclosure } from '@chakra-ui/react'
import ReviewList from '../../../components/pokemon-page/review-list'
import PokemonCard from '../../../components/pokemon-page/pokemon-card'
import NavSection from '../../../components/pokemon-page/nav-section'
import ActionButtons from '../../../components/pokemon-page/action-buttons'
import Layout from '../../../components/layout'
import Sidebar from '../../../components/sidebar/sidebar'
import SortSection from '../../../components/pokemon-page/sort-section'
import axios from 'axios'
import { useState } from 'react'
import { cyclic } from '../../../utils/axios'

const Pokemon = ({ pokemonName, gen }) => {
	const [sortOrder, setSortOrder] = useState(0)
	const { isOpen, onOpen, onClose } = useDisclosure()
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
	return (
		<Flex pt={16}>
			<Sidebar />
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
					<NavSection pokemonName={pokemonName} gen={gen} />
					<PokemonCard swrData={swrData} />
					<ActionButtons onOpen={onOpen} swrData={swrData} />
					<SortSection swrData={swrData} setSortOrder={setSortOrder} />
					<ReviewList
						swrData={swrData}
						isOpen={isOpen}
						onOpen={onOpen}
						onClose={onClose}
						sortOrder={sortOrder}
					/>
				</Container>
			</chakra.div>
		</Flex>
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
