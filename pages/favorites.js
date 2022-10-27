import React from 'react'
import FavoritesGrid from '../components/favorites/favorites-grid'
import Layout from '../components/layout'
import Sidebar from '../components/sidebar/sidebar'
import { Box, Heading, Flex } from '@chakra-ui/react'
import { getSession } from 'next-auth/react'
import { getPokemon } from '../utils/axios'
import { prisma } from '../lib/prisma'

const Favorites = ({ data }) => {
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
					<Heading as='h1' size='lg' align='left' py={8}>
						Your Favorite Pokemon
					</Heading>
					<FavoritesGrid data={data} />
				</Box>
			</Flex>
		</Layout>
	)
}

export const getServerSideProps = async context => {
	const session = await getSession(context)

	if (!session) {
		return {
			notFound: true
		}
	}
	////////////////////////////////////////////////////////////////////////////

	const user = await prisma.user.findUnique({
		where: { email: session.user.email }
	})

	const favoritedPokemon = await prisma.pokemon.findMany({
		where: {
			favoritedBy: {
				some: {
					id: user.id
				}
			}
		}
	})

	const data = await Promise.all(
		favoritedPokemon.map(async fav => {
			const response = await getPokemon(fav.pokemon)
			const { id: num, typesArr, imageUrl, imageAlt } = response

			const data = {
				...fav,
				num,
				typesArr,
				imageUrl,
				imageAlt
			}

			return data
		})
	)

	return {
		props: {
			data: data
		}
	}
}

export default Favorites
