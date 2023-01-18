import { Box } from '@chakra-ui/react'
import PokemonGrid from '../../../components/gen-page/pokemon-grid'
import Layout from '../../../components/layout'
import { isNumber } from '../../../utils/helpers'
import { cyclic } from '../../../utils/axios'
import { SWRConfig } from 'swr'

const GenerationPage = ({ fallback, gen }) => {
	return (
		<SWRConfig value={{ fallback }}>
			<Layout>
				<Box pt={16} flex={1} px='5' overflow='auto'>
					<PokemonGrid gen={gen} />
				</Box>
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

	if (id <= 0 || id >= 10) {
		return {
			notFound: true
		}
	}

	const data = await cyclic.get(`/gen/${id}`).then(res => res.data)
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
