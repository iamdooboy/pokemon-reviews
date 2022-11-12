import { Flex, Box } from '@chakra-ui/react'
import PokemonGrid from '../../../components/gen-page/pokemon-grid'
import Layout from '../../../components/layout'
import Sidebar from '../../../components/sidebar/sidebar'
import { isNumber, getLimitAndOffset } from '../../../utils/helpers'
import { api } from '../../../utils/axios'

const GenerationPage = ({ gen }) => {
	return (
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

	return {
		props: {
			gen: id
		}
	}
}

export default GenerationPage

// import { SWRConfig } from 'swr'
// import { Flex, Box } from '@chakra-ui/react'
// import PokemonGrid from '../../../components/gen-page/pokemon-grid'
// import Layout from '../../../components/layout'
// import Sidebar from '../../../components/sidebar/sidebar'
// import { isNumber, getLimitAndOffset } from '../../../utils/helpers'
// import { api } from '../../../utils/axios'

// const GenerationPage = ({ fallback, gen }) => {
// 	return (
// 		<SWRConfig value={{ fallback }}>
// 			<Layout>
// 				<Flex pt={16}>
// 					<Sidebar />
// 					<Box
// 						flex={1}
// 						px='5'
// 						overflow='auto'
// 						maxH='calc(100vh - var(--chakra-sizes-16))' //viewheight - navbar height
// 					>
// 						{/* <Heading as='h1' size='xl' align='center' py={4}>
// 						Pokemon Reviews
// 					</Heading>
// 					<Heading as='h1' size='md' align='center' py={4}>
// 						Nintendo has been creating a lot of questionable Pokemon. Luckily
// 						they are looking for your feedback.
// 					</Heading> */}
// 						<PokemonGrid gen={gen} />
// 					</Box>
// 				</Flex>
// 			</Layout>
// 		</SWRConfig>
// 	)
// }

// export const getServerSideProps = async context => {
// 	if (!isNumber(context.query.id)) {
// 		return {
// 			notFound: true
// 		}
// 	}

// 	const id = parseInt(context.query.id)

// 	if (id <= 0 || id >= 9) {
// 		return {
// 			notFound: true
// 		}
// 	}

// 	const options = getLimitAndOffset(id)

// 	const response = await api
// 		.get(`/pokemon?limit=${options.limit}&offset=${options.offset}`)
// 		.then(res => res.data.results)

// 	return {
// 		props: {
// 			fallback: {
// 				[`/gen/${id}`]: response
// 			},
// 			gen: context.query.id
// 		}
// 	}
// }

// export default GenerationPage
