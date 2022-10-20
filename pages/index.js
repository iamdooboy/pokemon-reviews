import {
	chakra,
	Box,
	Flex,
	Text,
	SimpleGrid,
	GridItem,
	Divider,
	HStack,
	Container
} from '@chakra-ui/react'
import { useInput } from '../hooks/useInput'
import { getPokemonGeneration } from '../utils/helpers'
import Layout from '../components/layout'
import CustomInputResults from '../components/custom-input-results'
import CustomInput from '../components/custom-input'
import { LinkOverlay } from '../components/link-overlay'
import RandomButton from '../components/random-button'

// const regions = [
// 	'Gen 1',
// 	'Gen 2',
// 	'Gen 3',
// 	'Gen 4',
// 	'Gen 5',
// 	'Gen 6',
// 	'Gen 7',
// 	'Gen 8'
// ]

const generations = [
	{ num: 1, color1: '#F2844B', color2: '#61CCEF' },
	{ num: 2, color1: '#A38E59', color2: '#5C6A71' },
	{ num: 3, color1: '#D9452F', color2: '#0075B7' },
	{ num: 4, color1: '#43A3B7', color2: '#B97692' },
	{ num: 5, color1: '#C8D4E6', color2: '#434343' },
	{ num: 6, color1: '#06598F', color2: '#CF2C46' },
	{ num: 7, color1: '#F99C1D', color2: '#1DB1E7' },
	{ num: 8, color1: '#00A1E9', color2: '#E50C5C' }
]

const Page = () => {
	const {
		pokemon,
		filteredList,
		activeIndex,
		setActiveIndex,
		onChangeHandler,
		onKeyDownHandler,
		onCloseHandler
	} = useInput()

	return (
		<Layout>
			<Container maxW='5xl' pt={40} h='98vh'>
				<Box pt={20} textAlign={{ base: 'left', md: 'center' }}>
					<Container maxW='xl'>
						<chakra.span
							fontSize={{ base: '2xl', sm: '4xl' }}
							fontWeight='extrabold'
							letterSpacing='tight'
							lineHeight='shorter'
							color='gray.100'
							mb={6}
						>
							<chakra.span display='block' color='gray.500'>
								Ready to leave a review?
							</chakra.span>
							<chakra.span display='inline'>
								Find your{' '}
								<Text
									display={{
										base: 'inline',
										lg: 'inline'
									}}
									w='full'
									bgClip='text'
									bgGradient='linear(to-r, green.400,purple.500)'
									fontWeight='extrabold'
								>
									favorite Pokemon
								</Text>{' '}
							</chakra.span>
						</chakra.span>
						<HStack mt={8} justify='center' w='full'>
							<CustomInput
								boxSize={4}
								size='lg'
								bg='gray.700'
								rounded='md'
								p={0}
								onChange={onChangeHandler}
								onKeyDown={onKeyDownHandler}
							/>
							<RandomButton w='30%' size='lg' pokemon={pokemon}>
								Surprise Me
							</RandomButton>
						</HStack>
						{filteredList.map((pkmn, index) => {
							const pokemonId = pokemon.indexOf(pkmn) + 1
							const gen = getPokemonGeneration(pokemonId)
							return (
								<CustomInputResults
									gen={gen}
									activeIndex={activeIndex}
									setActiveIndex={setActiveIndex}
									key={pkmn}
									pokemon={pkmn}
									onClose={() => onCloseHandler()}
									index={index}
								/>
							)
						})}
						<Divider my={10} />
						<Flex as='section' justify='center' w='full' h='full'>
							<SimpleGrid columns={[2, 4, 4]} spacing={10}>
								{generations.map((gen, index) => (
									<GridItem key={gen.num}>
										<LinkOverlay href={`/gen/${index + 1}/`}>
											<Box rounded='md' px={5} py={2} bg='gray.700'>
												Gen {gen.num}
											</Box>
										</LinkOverlay>
									</GridItem>
								))}
							</SimpleGrid>
						</Flex>
					</Container>
				</Box>
			</Container>
		</Layout>
	)
}
export default Page
