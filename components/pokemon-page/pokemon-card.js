import {
	Box,
	HStack,
	Text,
	Image,
	Heading,
	Flex,
	Stack
} from '@chakra-ui/react'
import { FallBackImage } from '../../utils/fallback-image'
import { useFetchPokemon } from '../../hooks/useFetchPokemon'

const Star = ({ fillColor }) => {
	return (
		<svg
			style={{
				width: '.95rem',
				height: '.95rem',
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

const PokemonCard = ({ pokemonName }) => {
	const { types, imageUrl, imageAlt, name, id } = useFetchPokemon(pokemonName)

	return (
		<Box
			bgGradient={`linear(to-tl, ${types[0]}.default, ${
				types[1] ? types[1] + '.default' : types[0] + '.light'
			})`}
			p='2px'
			rounded={8}
			maxW='xs'
			pos='relative'
			zIndex={-1}
		>
			<Box maxW='xs' p={3} rounded={8} mx='auto' bg='rgba(17, 25, 40, 0.6)'>
				<Box
					borderWidth={2}
					rounded={4}
					bg='#282d359e'
					borderColor='whiteAlpha.600'
					maxW='100%'
					height='auto'
				>
					<Text opacity={0.4} px={1} align='start' zIndex={1}>
						{id}
					</Text>
					<Box mt='-15px'>
						<FallBackImage
							w='auto'
							h='auto'
							width={600}
							height={600}
							src={imageUrl}
							alt={imageAlt}
							fallback='/bug.svg'
							placeholder='blur'
							blurDataURL={imageUrl}
						/>
					</Box>
				</Box>
				<Box>
					<Heading
						as='h1'
						size='lg'
						fontWeight='800'
						letterSpacing={1}
						align='left'
					>
						{name}
					</Heading>
					<HStack>
						<Stack>
							<HStack>
								{types.map((type, index) => (
									<Image
										key={index}
										boxSize='23%'
										src={`/type/${type}.png`}
										alt={`${type}`}
									/>
								))}
							</HStack>
							<Flex align='center' mt={4}>
								{Array.from(Array(4).keys()).map(id => {
									return <Star key={id} fillColor='#FBBC05' />
								})}
								{Array.from(Array(5 - 4).keys()).map(id => {
									return <Star key={id} fillColor='#E8EAEE' />
								})}
								<Text opacity={0.4}>(365)</Text>
							</Flex>
						</Stack>
						<Heading
							as='h1'
							fontSize='5xl'
							fontWeight='900'
							position='relative'
							_before={{
								content: '""',
								position: 'absolute',
								top: '100%',
								width: '100%',
								left: '0',
								height: '2px',
								bgGradient: `linear(to-r, ${types[0]}.default, ${
									types[1] ? types[1] + '.default' : types[0] + '.light'
								})`
							}}
						>
							4.5
						</Heading>
					</HStack>
				</Box>
			</Box>
		</Box>
	)
}

export default PokemonCard
