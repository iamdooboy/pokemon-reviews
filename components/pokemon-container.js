import React, { useState, useRef, useCallback } from 'react'
import { SimpleGrid, Spinner, GridItem } from '@chakra-ui/react'
import PokemonCard from './pokemon-card'
import useFetch from '../hooks/useFetch'
import NextLink from 'next/link'
import { Link } from '@chakra-ui/react'

const PokemonContainer = () => {
	const [offset, setOffset] = useState(0)
	const { isLoading, isError, error, results, hasNextPage } = useFetch(offset)

	const intObserver = useRef()
	const lastPageRef = useCallback(
		pokemon => {
			if (isLoading) return
			if (intObserver.current) {
				intObserver.current.disconnect()
			}
			intObserver.current = new IntersectionObserver(pokemon => {
				if (pokemon[0].isIntersecting && hasNextPage) {
					setOffset(prev => prev + 24)
				}
			})

			if (pokemon) {
				intObserver.current.observe(pokemon)
			}
		},
		[isLoading, hasNextPage]
	)

	if (isError) {
		return <p>Error: {error.message}</p>
	}

	const LinkOverlay = ({ href, as, children }) => {
		return (
			<NextLink href={href} as={as} passHref>
				<Link _hover={{ textDecoration: 'none' }}>{children}</Link>
			</NextLink>
		)
	}

	const content = results.map((pokemon, index) => {
		if (results.length === index + 1) {
			return (
				<LinkOverlay
					href={{
						pathname: `/[pokemonid]`,
						query: {
							pokemonid: pokemon.name
						}
					}}
					as={`/${pokemon.name}`}
					key={index}
				>
					<PokemonCard ref={lastPageRef} pokemon={pokemon} />
				</LinkOverlay>
			)
		}

		return (
			<LinkOverlay
				href={{
					pathname: `/[pokemonid]`,
					query: {
						pokemonid: pokemon.name
					}
				}}
				as={`/${pokemon.name}`}
				key={index}
			>
				<PokemonCard pokemon={pokemon} />
			</LinkOverlay>
		)
	})

	return (
		<SimpleGrid columns={[2, 3, 6]} spacing={6} py={4}>
			{isLoading && (
				<GridItem colSpan={'6'} display='flex' justifyContent='center'>
					<Spinner
						alignItems='center'
						justifyContent='center'
						thickness='4px'
						speed='0.65s'
						emptyColor='gray.200'
						color='blue.500'
						size='xl'
					/>
				</GridItem>
			)}
			{content}
		</SimpleGrid>
	)
}

export default PokemonContainer
