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
	Image
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

const generations = [
	{ num: 1, color1: '#F2844B', color2: '#61CCEF' },
	{ num: 2, color1: '#A38E59', color2: '#5C6A71' },
	{ num: 3, color1: '#D9452F', color2: '#0075B7' },
	{ num: 4, color1: '#43A3B7', color2: '#B97692' },
	{ num: 5, color1: '#C8D4E6', color2: '#434343' },
	{ num: 6, color1: '#06598F', color2: '#CF2C46' },
	{ num: 7, color1: '#F99C1D', color2: '#1DB1E7' },
	{ num: 8, color1: '#00A1E9', color2: '#E50C5C' },
	{ num: 9, color1: '#00A1E9', color2: '#E50C5C' }
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
		const rand = randomId ? randomId : getRandomPokemonNum()

		const gen = getPokemonGeneration(rand)
		const name = pokemon[rand - 1]

		router.push(`/gen/${gen}/${name}`)
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
								Where every Pokemon is critiqued and appreciated!
							</chakra.span>
							<chakra.span display='inline'>
								Share your{' '}
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
									feedback!
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
							<SimpleGrid columns={3} spacing={10} w='full'>
								{generations.map((gen, index) => (
									<GridItem key={gen.num}>
										<LinkOverlay href={`/gen/${index + 1}/`}>
											<Button
												rounded='md'
												w='full'
												py={2}
												colorScheme='gray'
												_hover={{ bg: '#6A7DB3' }}
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
