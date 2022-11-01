import { useEffect, useState, useRef } from 'react'
import PokemonGrid from '../../../components/gen-page/pokemon-grid'
import { getPokemonGenPage } from '../../../utils/axios'
import { Heading, Flex, Box } from '@chakra-ui/react'
import Layout from '../../../components/layout'
import Sidebar from '../../../components/sidebar/sidebar'
import { isNumber, getLimitAndOffset } from '../../../utils/helpers'
import { api } from '../../../utils/axios'
import { prisma } from '../../../lib/prisma'

const GenerationPage = ({ data = [] }) => {
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
					<Heading as='h1' size='xl' align='center' py={4}>
						Pokemon Reviews
					</Heading>
					<Heading as='h1' size='md' align='center' py={4}>
						Nintendo has been creating a lot of questionable Pokemon. Luckily
						they are looking for your feedback.
					</Heading>
					<PokemonGrid data={data} />
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

	const options = getLimitAndOffset(id)

	const response = await api.get(
		`/pokemon?limit=${options.limit}&offset=${options.offset}`
	)

	const data = await Promise.all(
		response.data.results.map(async ({ name }) => {
			const { data } = await api.get(`/pokemon/${name}`)
			const test = await prisma.review.findMany({
				where: {
					pokemon: name
				}
			})

			const totalRating = test
				? test.reduce((sum, obj) => sum + obj.rating, 0)
				: 0
			let averageRating = totalRating ? totalRating / test.length : 0

			averageRating = Math.round(averageRating * 10) / 10

			const reviews = {
				reviewCount: test.length,
				rating: averageRating
			}

			const { id, types } = data

			let paddedId = id.toString().padStart(3, '0')

			const imageData = {
				imageUrl: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedId}.png`,
				imageAlt: name
			}
			return { name, id, types, gen: options.gen, ...imageData, ...reviews }
		})
	)

	return {
		props: {
			data: data
		}
	}
}

export default GenerationPage
