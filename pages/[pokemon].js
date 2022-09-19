import React from 'react'
import { getPokemonName } from '../utils/axios'
import {
	chakra,
	Box,
	Stack,
	VStack,
	HStack,
	Flex,
	Text,
	Image,
	Container,
	Icon,
	StackProps,
	Badge,
	Heading,
	Progress,
	OrderedList,
	ListItem,
	Spacer,
	Center,
	Square,
	Grid,
	GridItem,
	SimpleGrid,
	Divider,
	StackDivider
} from '@chakra-ui/react'

const Star = ({ fillColor }) => {
	return (
		<svg
			style={{
				width: '2rem',
				height: '2rem',
				fill: fillColor,
				marginRight: '0.25rem'
			}}
			viewBox='0 0 1000 1000'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path d='M972 380c9 28 2 50-20 67L725 619l87 280c11 39-18 75-54 75-12 0-23-4-33-12L499 790 273 962a58 58 0 0 1-78-12 50 50 0 0 1-8-51l86-278L46 447c-21-17-28-39-19-67 8-24 29-40 52-40h280l87-279c7-23 28-39 52-39 25 0 47 17 54 41l87 277h280c24 0 45 16 53 40z' />
		</svg>
	)
}

const Pokemon = ({ data }) => {
	const formatName = data.charAt(0).toUpperCase() + data.slice(1)
	return (
		<Container maxW='container.md' p={{ base: 5, md: 12 }} margin='0 auto'>
			<Box
				maxW='xs'
				rounded={8}
				borderWidth={1}
				align='center'
				mx='auto'
				bg='rgba(17, 25, 40, 0.75)'
			>
				<Box>
					<Text pr={1} align='right' color='gray.600'>
						004
					</Text>
					<Image
						w={{ base: '60%' }}
						h='auto'
						objectFit='cover'
						src='https://assets.pokemon.com/assets/cms2/img/pokedex/full/032.png'
						alt='pokemon'
					/>
				</Box>
				<Heading as='h2' size='lg' fontWeight='bold' my={4}>
					{formatName}
				</Heading>
				<HStack align='center' justify='center' py={1}>
					<Badge colorScheme='green'>Grass</Badge>
					<Badge colorScheme='red'>Fire</Badge>
				</HStack>
				<Divider pt={4} />
				<Heading
					as='h1'
					fontSize='3.5rem'
					fontWeight='400'
					lineHeight='4rem'
					py={2}
				>
					4.5
				</Heading>

				<Flex justifyContent='center'>
					{Array.from(Array(4).keys()).map(id => {
						return <Star key={id} fillColor='#FBBC05' />
					})}
					{Array.from(Array(5 - 4).keys()).map(id => {
						return <Star key={id} fillColor='#E8EAEE' />
					})}
				</Flex>

				<Text fontWeight='500' fontSize='1.2rem' lineHeight='1.25rem' my={5}>
					1355 ratings
				</Text>
			</Box>
		</Container>
	)
}

export const getServerSideProps = async ({ params }) => {
	const { pokemon } = params
	const allPokemon = await getPokemonName()

	if (!allPokemon.includes(pokemon)) {
		return {
			notFound: true
		}
	}

	return {
		props: {
			data: pokemon
		}
	}
}

export default Pokemon
