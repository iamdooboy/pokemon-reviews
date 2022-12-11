import {
	chakra,
	Box,
	Flex,
	Text,
	SimpleGrid,
	GridItem,
	Divider,
	HStack,
	Container,
	Button,
	Image,
	Spinner
} from '@chakra-ui/react'
import { useInput } from '../hooks/useInput'
import {
	getPokemonGeneration,
	getRandomPokemonNum,
	getPokemonImageUrl
} from '../utils/helpers'
import Layout from '../components/layout'
import CustomInputResults from '../components/custom-input-results'
import CustomInput from '../components/custom-input'
import { LinkOverlay } from '../components/link-overlay'
import RandomButton from '../components/random-button'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { GenPageSkeleton } from '../components/loading/gen-page-skeleton'
import { ReviewBoxSkeleton } from '../components/loading/review-box-skeleton'
import { PokemonCardSkeleton } from '../components/loading/pokemon-card-skeleton'
import { MdOutlineEdit } from 'react-icons/md'
import NavSection from '../components/pokemon-page/nav-section'

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
		onChangeHandler,
		onKeyDownHandler,
		onCloseHandler
	} = useInput()

	const up = '/up.png'
	const down = '/down.png'

	const router = useRouter()
	const [image, setImage] = useState(down)
	const [randomId, setRandomId] = useState('')
	const [imageUrl, setImageUrl] = useState('')
	const [genPageLoading, setGenPageLoading] = useState(false)
	const [pokemonPageLoading, setPokemonPageLoading] = useState(false)

	const onMouseEnterHandler = () => {
		setImage(up)
		const random = getRandomPokemonNum()
		setRandomId(random)
		const url = getPokemonImageUrl(random)
		setImageUrl(url)
	}

	const onMouseLeaveHandler = () => {
		setImage(down)
		setRandomId('')
		setImageUrl('')
	}

	const onClickHandler = () => {
		setPokemonPageLoading(true)
		if (!randomId) {
			randomId = getRandomPokemonNum()
		}
		const gen = getPokemonGeneration(randomId)
		const name = pokemon[randomId - 1]

		router.push(`/gen/${gen}/${name}`)
	}

	if (genPageLoading || pokemonPageLoading) {
		return (
			<Layout>
				<Flex pt={14}>
					<Box
						flex={1}
						px='5'
						overflow='auto'
						maxH='calc(100vh - var(--chakra-sizes-16))'
					>
						{genPageLoading ? (
							<GenPageSkeleton />
						) : (
							<Container
								maxW='container.xl'
								px={{ base: 5, md: 12 }}
								margin='0 auto'
								align='center'
								justify='center'
							>
								<NavSection id={randomId} pokemon={pokemon} />
								<PokemonCardSkeleton />
								<HStack align='center' justify='center' mt={3} maxW='xs'>
									<Button
										isLoading
										variant='outline'
										w='20%'
										colorScheme='blue'
										spinner={<Spinner size='xs' />}
									/>

									<Button
										isLoading={true}
										loadingText='Leave a review'
										spinner={null}
										leftIcon={<MdOutlineEdit />}
										colorScheme='blue'
										w='80%'
									>
										Leave a review
									</Button>
								</HStack>
								<ReviewBoxSkeleton />
							</Container>
						)}
					</Box>
				</Flex>
			</Layout>
		)
	}

	return (
		<Layout>
			<Container maxW='5xl' pt={40} h='100vh'>
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
							<RandomButton
								w='30%'
								size='lg'
								onMouseEnter={onMouseEnterHandler}
								onMouseOut={onMouseLeaveHandler}
								onClick={onClickHandler}
							>
								Surprise Me
							</RandomButton>
						</HStack>
						{filteredList.map((pkmn, index) => {
							const pokemonId = pokemon.indexOf(pkmn) + 1
							const gen = getPokemonGeneration(pokemonId)
							return (
								<CustomInputResults
									key={pkmn}
									id={pokemonId}
									gen={gen}
									pokemon={pkmn}
									onClose={onCloseHandler}
									bgColor={index === activeIndex ? 'blue.600' : 'gray.600'}
								/>
							)
						})}
						<Divider my={10} />
						<Flex as='section' justify='center' w='full' h='full'>
							<SimpleGrid columns={[2, 4, 4]} spacing={10}>
								{generations.map((gen, index) => (
									<GridItem key={gen.num}>
										<LinkOverlay href={`/gen/${index + 1}/`}>
											<Button
												rounded='md'
												px={5}
												py={2}
												colorScheme='gray'
												_hover={{ bg: '#6A7DB3' }}
												onClick={() => setGenPageLoading(true)}
											>
												Gen {gen.num}
											</Button>
										</LinkOverlay>
									</GridItem>
								))}
							</SimpleGrid>
						</Flex>
					</Container>
				</Box>
				<chakra.div display={{ base: 'none', md: 'inline', lg: 'inline' }}>
					<Image
						pos='absolute'
						boxSize='65px'
						display={!imageUrl && 'none'}
						src={imageUrl}
						right='119px'
						bottom='114px'
						zIndex='1'
						filter='auto'
						brightness='0%'
						blur='.5px'
						alt=''
					/>
					<Image
						pos='absolute'
						bottom={0}
						right={0}
						boxSize='200px'
						src={image}
						alt=''
					/>
				</chakra.div>
			</Container>
		</Layout>
	)
}
export default Page
