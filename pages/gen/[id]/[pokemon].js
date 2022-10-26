import { chakra, Container, Box, Flex } from '@chakra-ui/react'
import { getSession, useSession } from 'next-auth/react'
import ReviewBox from '../../../components/pokemon-page/review-box'
import ReviewModal from '../../../components/pokemon-page/review-modal'
import PokemonCard from '../../../components/pokemon-page/pokemon-card'
import NavSection from '../../../components/pokemon-page/nav-section'
import ActionButtons from '../../../components/pokemon-page/action-buttons'
import Layout from '../../../components/layout'
import Sidebar from '../../../components/sidebar/sidebar'
import { prisma } from '../../../lib/prisma'
import { getPokemon, getAllPokemonFromGen } from '../../../utils/axios'
import { useInput } from '../../../hooks/useInput'
import { useFavorite } from '../../../hooks/useFavorite'
import { useReview } from '../../../hooks/useReview'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { PokemonCardSkeleton } from '../../../components/loading/pokemon-card-skeleton'
import { ReviewBoxSkeleton } from '../../../components/loading/review-box-skeleton'

const Empty = ({ pokemonName }) => {
	const formatName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)
	return (
		<Box
			fontWeight='600'
			maxW='xs'
			rounded={8}
			borderWidth={1}
			align='center'
			mt={3}
			mx='auto'
			p={3}
			bg='rgba(17, 25, 40, 0.75)'
		>
			Be the first to review {formatName}!
		</Box>
	)
}

const Pokemon = ({
	user = { id: null },
	reviews = [],
	data,
	pokemonName,
	numOfFavorite = 0,
	didUserFavoriteThisPokemon = false,
	pokemonId,
	genId
}) => {
	const { data: session } = useSession()
	const { pokemon } = useInput()
	const { id } = data

	const {
		initialRef,
		isOpen,
		onOpen,
		onClose,
		onEdit,
		onDelete,
		allReviews,
		editReview,
		onSubmit
	} = useReview(reviews, pokemonName)

	const { favoriteClickHandler, numberOfFavorites, favorite } = useFavorite(
		'pokemon',
		pokemonId,
		numOfFavorite,
		didUserFavoriteThisPokemon
	)

	const router = useRouter()
	const [isLoaded, setIsLoaded] = useState(true)

	useEffect(() => {
		const handleStart = url => {
			console.log(url)
			setIsLoaded(false)
		}

		const handleStop = url => {
			console.log(url)
			setIsLoaded(true)
		}

		router.events.on('routeChangeStart', handleStart)
		router.events.on('routeChangeComplete', handleStop)
		router.events.on('routeChangeError', handleStop)

		return () => {
			router.events.off('routeChangeStart', handleStart)
			router.events.off('routeChangeComplete', handleStop)
			router.events.off('routeChangeError', handleStop)
		}
	}, [router])

	return (
		<Flex pt={16}>
			<Sidebar id={genId} />
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
					<NavSection {...{ id, pokemon }} />
					{isLoaded ? <PokemonCard data={data} /> : PokemonCardSkeleton}
					<ActionButtons
						{...{
							favoriteClickHandler,
							numberOfFavorites,
							favorite,
							session,
							onOpen
						}}
					/>
					{isLoaded ? (
						allReviews.length === 0 ? (
							<Empty {...{ pokemonName }} />
						) : (
							allReviews.map(review => (
								<ReviewBox
									key={review.id}
									{...{ user, review, onEdit, onDelete }}
								/>
							))
						)
					) : (
						ReviewBoxSkeleton
					)}
					<ReviewModal
						{...{
							pokemonName,
							isOpen,
							onClose,
							initialRef,
							editReview,
							onSubmit
						}}
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
	const { id: genId, pokemon } = context.params

	const names = await getAllPokemonFromGen(genId)

	const exist = names.includes(pokemon)

	if (!exist) {
		return {
			notFound: true
		}
	}

	///////////////////////////////////////////////

	const response = await getPokemon(pokemon)

	const pokemonData = {
		name: pokemon,
		...response
	}

	///////////////////////////////////////////////

	const session = await getSession(context)

	const savedPokemon = await prisma.pokemon.findUnique({
		where: {
			pokemon: pokemon
		},
		select: {
			id: true,
			favorite: true,
			favoritedBy: true
		}
	})

	let reviews = await prisma.review.findMany({
		//return all reviews for the selected pokemond
		where: {
			pokemon: pokemon
		},
		include: {
			//return all fields from user model
			author: true,
			favoritedBy: true
		}
	})

	const { id, favorite, favoritedBy } = savedPokemon

	if (!session) {
		return {
			props: {
				data: pokemonData,
				pokemonName: pokemon,
				numOfFavorite: favorite,
				reviews: JSON.parse(JSON.stringify(reviews))
			}
		}
	}

	///////////////////////////////////////////////

	const user = await prisma.user.findUnique({
		where: { email: session.user.email }
	})

	const didUserFavoriteThisPokemon = favoritedBy.some(el => el.id === user.id)

	reviews = reviews.map(review => {
		const favoritedByCurrentUser = review.favoritedBy.some(
			el => el.id === user.id
		)

		delete review.favoritedBy

		return { ...review, favoritedByCurrentUser }
	})

	return {
		props: {
			user: JSON.parse(JSON.stringify(user)),
			data: pokemonData,
			pokemonName: pokemon,
			reviews: JSON.parse(JSON.stringify(reviews)),
			numOfFavorite: favorite,
			didUserFavoriteThisPokemon,
			pokemonId: id,
			genId: genId
		}
	}
}

export default Pokemon
