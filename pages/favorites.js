import FavoritesGrid from '../components/favorites/favorites-grid'
import Layout from '../components/layout'
import Sidebar from '../components/sidebar/sidebar'
import { Box, Flex } from '@chakra-ui/react'
import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from '../pages/api/auth/[...nextauth]'
// import { getSession } from 'next-auth/react'
// import { getPokemon } from '../utils/axios'
// import { prisma } from '../lib/prisma'
// import { FavoritePokemonGridSkeleton } from '../components/loading/favorite-pokemon-skeleton'

const Favorites = () => {
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
	////////////////////////////////////////////////////////////////////////////

	// const user = await prisma.user.findUnique({
	// 	where: { email: session.user.email }
	// })

	// const favoritedPokemon = await prisma.pokemon.findMany({
	// 	where: {
	// 		favoritedBy: {
	// 			some: {
	// 				id: user.id
	// 			}
	// 		}
	// 	}
	// })

	// const data = await Promise.all(
	// 	favoritedPokemon.map(async fav => {
	// 		const response = await getPokemon(fav.pokemon)
	// 		const { id: num, typesArr, imageUrl, imageAlt } = response

	// 		const data = {
	// 			...fav,
	// 			num,
	// 			typesArr,
	// 			imageUrl,
	// 			imageAlt
	// 		}

	// 		return data
	// 	})
	// )

	return {
		props: {
			session
		}
	}
}

export default Favorites
