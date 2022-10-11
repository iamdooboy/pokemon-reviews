import {
	chakra,
	Box,
	Flex,
	Text,
	Button,
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

const regions = [
	'Gen 1',
	'Gen 2',
	'Gen 3',
	'Gen 4',
	'Gen 5',
	'Gen 6',
	'Gen 7',
	'Gen 8'
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
							<Button size='lg'>Random</Button>
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
								{regions.map((region, index) => (
									<GridItem key={region}>
										<LinkOverlay key={index} href={`/gen/${index + 1}/`}>
											<Box rounded='md' px={3} py={2} bg='gray.700'>
												{region}
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
