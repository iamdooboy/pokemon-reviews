import { Flex, Box } from '@chakra-ui/react'
import PokemonGrid from '../../../components/gen-page/pokemon-grid'
import Layout from '../../../components/layout'
import Sidebar from '../../../components/sidebar/sidebar'
import { isNumber } from '../../../utils/helpers'
import { api } from '../../../utils/axios'
import { getLimitAndOffset } from '../../../utils/helpers'
import { SWRConfig } from 'swr'
import axios from 'axios'

const GenerationPage = ({ fallback, gen }) => {
	return (
		<SWRConfig value={{ fallback }}>
			<Layout>
				<Flex pt={16}>
					<Sidebar />
					<Box
						flex={1}
						px='5'
						overflow='auto'
						maxH='calc(100vh - var(--chakra-sizes-16))' //viewheight - navbar height
					>
						{/* <Heading as='h1' size='xl' align='center' py={4}>
						Pokemon Reviews
					</Heading>
					<Heading as='h1' size='md' align='center' py={4}>
						Nintendo has been creating a lot of questionable Pokemon. Luckily
						they are looking for your feedback.
					</Heading> */}
						<PokemonGrid gen={gen} />
					</Box>
				</Flex>
			</Layout>
		</SWRConfig>
	)
}

export const getServerSideProps = async context => {
	if (!isNumber(context.query.id)) {
		return {
			notFound: true
		}
	}

	const id = parseInt(context.query.id)

	if (id <= 0 || id >= 9) {
		return {
			notFound: true
		}
	}

	const { limit, offset } = getLimitAndOffset(id)

	// const data = await api
	// 	.get(`/pokemon?limit=${limit}&offset=${offset}`)
	// 	.then(res => res.data.results.map(el => el.name))

	const data = await axios.get(`https://poke-api.up.railway.app/api/gen/${id}`).then(res => res.data.map(el => el.name))

	return {
		props: {
			fallback: {
				[`/gen/${id}`]: data
			},
			gen: id
		}
	}
}

export default GenerationPage
