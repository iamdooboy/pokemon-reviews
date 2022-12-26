import { useState, useRef, useEffect } from 'react'
import {
	chakra,
	Box,
	Text,
	Image,
	Heading,
	Flex,
	Button,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	forwardRef,
	Card,
	CardBody,
	CardFooter,
	Divider
} from '@chakra-ui/react'
import { CustomRating } from '../rating'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { capitalFirstLetter, formatNames } from '../../utils/helpers'

const MenuBtn = forwardRef((props, ref) => {
	return (
		<Button
			rightIcon={<ChevronDownIcon />}
			my={2}
			size='sm'
			w='full'
			justifyContent='space-between'
			ref={ref}
			{...props}
		/>
	)
})

const PokemonCard = ({ data, count, rating }) => {
	const formattedName = capitalFirstLetter(formatNames(data.name))

	const { id, mega, variant, forms } = data

	const menuState = {
		name: data.default ? data.default : formattedName,
		types: data.types,
		image: data.image
	}

	const [pokemonData, setPokemonData] = useState(menuState)

	const { name, image, types } = pokemonData

	const showMenu = Boolean(mega.length || variant.length || forms.length)

	const onClickHandler = obj => {
		const words = obj.name.split(' ')

		const format = words
			.map(word => {
				return word[0].toUpperCase() + word.substring(1)
			})
			.join(' ')

		setPokemonData({
			...data,
			name: format,
			types: obj.types,
			image: obj.image
		})
	}

	return (
		<Card
			maxW='sm'
			bgGradient={`linear(to-tl, ${types[0]}.default, ${
				types[1] ? types[1] + '.default' : types[0] + '.light'
			})`}
			p='2px'
			mt={3}
		>
			<Card maxW='sm' bg='rgba(17, 25, 40, 0.6)'>
				<CardBody p={3}>
					<Box
						borderWidth={2}
						rounded={4}
						bg='#282d359e'
						borderColor='whiteAlpha.600'
						maxW='100%'
						height='auto'
						p={2}
					>
						<Image src={image} alt={name} borderRadius='lg' />
					</Box>
					<Box>
						<Flex justify='space-between' w='full' align='center'>
							<Heading size='xl'>{formattedName}</Heading>
							<Heading size='md' opacity={0.5}>
								&#35;{id}
							</Heading>
						</Flex>
						<Flex spacing='4'>
							<Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
								<Box>
									<Flex gap={1}>
										{types.map((type, index) => (
											<Image
												key={index}
												my={1}
												boxSize='20%'
												src={`/type/${type}.png`}
												alt={`${type}`}
											/>
										))}
									</Flex>
									<chakra.div
										align='start'
										justify='start'
										my={1}
										display='flex'
									>
										<CustomRating maxW={130} value={rating} readOnly />
										<Text fontSize='2xl' opacity={0.4}>
											&nbsp;({count})
										</Text>
									</chakra.div>
								</Box>
							</Flex>
							<Heading as='h1' size='4xl' fontWeight='900'>
								{rating.toFixed(1)}
							</Heading>
						</Flex>
					</Box>
				</CardBody>
				{showMenu && (
					<>
						<Divider />
						<CardFooter py={1} px={3}>
							<Menu matchWidth zIndex={1}>
								<MenuButton as={MenuBtn} my={2} textTransform='capitalize'>
									{name}
								</MenuButton>
								<MenuList w='100%'>
									{!data.default && (
										<MenuItem onClick={() => setPokemonData(data)}>
											{formattedName}
										</MenuItem>
									)}
									{mega?.map(m => (
										<MenuItem
											textTransform='capitalize'
											key={m.name}
											onClick={() => onClickHandler(m)}
										>
											{m.name}
										</MenuItem>
									))}
									{forms?.map(f => (
										<MenuItem
											textTransform='capitalize'
											key={f.name}
											onClick={() => onClickHandler(f)}
										>
											{f.name}
										</MenuItem>
									))}
									{variant?.map(v => (
										<MenuItem
											textTransform='capitalize'
											key={v.name}
											onClick={() => onClickHandler(v)}
										>
											{v.name}
										</MenuItem>
									))}
								</MenuList>
							</Menu>
						</CardFooter>
					</>
				)}
			</Card>
		</Card>
	)
}

export default PokemonCard
