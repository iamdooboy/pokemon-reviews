import { useRef } from 'react'
import { chakra, Container, Box, Flex, useDisclosure } from '@chakra-ui/react'
import ReviewList from '../../../components/pokemon-page/review-list'
import ReviewModal from '../../../components/pokemon-page/review-modal'
import PokemonCard from '../../../components/pokemon-page/pokemon-card'
import NavSection from '../../../components/pokemon-page/nav-section'
import ActionButtons from '../../../components/pokemon-page/action-buttons'
import Layout from '../../../components/layout'
import Sidebar from '../../../components/sidebar/sidebar'
import { prisma } from '../../../lib/prisma'
import { getPokemon, getAllPokemonFromGen } from '../../../utils/axios'
import { useState } from 'react'
import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from '../../api/auth/[...nextauth]'
import { SWRConfig } from 'swr'

// const Empty = ({ pokemonName }) => {
// 	const formatName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)
// 	return (
// 		<Box
// 			fontWeight='600'
// 			maxW='xs'
// 			rounded={8}
// 			borderWidth={1}
// 			align='center'
// 			mt={3}
// 			mx='auto'
// 			p={3}
// 			bg='rgba(17, 25, 40, 0.75)'
// 		>
// 			Be the first to review {formatName}!
// 		</Box>
// 	)
// }

const Pokemon = ({ fallback, pokemonName, favorite, gen }) => {
	const [selected, setSelected] = useState({ description: '', rating: 0 })
	const { isOpen, onOpen, onClose } = useDisclosure()
	const initialRef = useRef()

	return (
		// <SWRConfig value={{ fallback }}>
		<Flex pt={16}>
			<Sidebar id={gen} />
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
					<PokemonCard pokemonName={pokemonName} />
					<ActionButtons onOpen={onOpen} pokemonName={pokemonName} />
					<ReviewList
						pokemonName={pokemonName}
						onOpen={onOpen}
						setSelected={setSelected}
					/>
					<ReviewModal
						{...{
							pokemonName,
							isOpen,
							onClose,
							initialRef,
							selected,
							setSelected
						}}
					/>
				</Container>
			</chakra.div>
		</Flex>
		// </SWRConfig>
	)
}

Pokemon.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>
}

export const getServerSideProps = async context => {
	const { id: gen, pokemon } = context.params

	const names = await getAllPokemonFromGen(gen)

	if (!names.includes(pokemon)) {
		return {
			notFound: true
		}
	}

	///////////////////////////////////////////////

	const session = await unstable_getServerSession(
		context.req,
		context.res,
		authOptions
	)

	const user = await prisma.user.findUnique({
		where: { email: session.user.email }
	})

	const response = await getPokemon(pokemon)

	const selectedPokemon = await prisma.pokemon.findUnique({
		where: {
			pokemon: pokemon
		},
		select: {
			id: true,
			favorite: true,
			favoritedBy: true
		}
	})

	const favorite = selectedPokemon.favoritedBy.some(el => el.id === user.id)

	let reviews = await prisma.review.findMany({
		where: {
			pokemon: pokemon
		},
		include: {
			author: true,
			favoritedBy: true
		}
	})

	reviews = reviews.map(review => {
		const favoritedByCurrentUser = review.favoritedBy.some(
			el => el.id === user.id
		)

		delete review.favoritedBy

		return { ...review, favoritedByCurrentUser }
	})

	return {
		props: {
			// fallback: {
			// 	[`/pokemon/${pokemon}`]: response,
			// 	[`/api/pokemon/${pokemon}`]: selectedPokemon,
			// 	[`/api/reviews/${pokemon}`]: JSON.parse(JSON.stringify(reviews)),
			// 	['/api/user']: JSON.parse(JSON.stringify(user))
			// },
			pokemonName: pokemon,
			favorite,
			gen
		}
	}
}

export default Pokemon
