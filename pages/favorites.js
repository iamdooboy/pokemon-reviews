import FavoritesGrid from '../components/favorites-page/favorites-grid'
import Layout from '../components/layout'
import { Box, Flex } from '@chakra-ui/react'
import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from '../pages/api/auth/[...nextauth]'

const Favorites = () => {
	return (
		<Layout>
			<Flex pt={16}>
				<Box
					flex={1}
					px='5'
					overflow='auto'
					maxH='calc(100vh - var(--chakra-sizes-16))' //viewheight - navbar height
				>
					<FavoritesGrid />
				</Box>
			</Flex>
		</Layout>
	)
}

export const getServerSideProps = async context => {
	const session = await unstable_getServerSession(
		context.req,
		context.res,
		authOptions
	)

	if (!session) {
		return {
			notFound: true
		}
	}

	return {
		props: {}
	}
}

export default Favorites
