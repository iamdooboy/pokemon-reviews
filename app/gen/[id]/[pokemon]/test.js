'use client'

import React, { useState } from 'react'
import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Flex,
	Text,
	Image,
	Button,
	Avatar,
	Heading,
	Box,
	IconButton,
	Stack,
	Divider,
	ButtonGroup,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	forwardRef,
	chakra
} from '@chakra-ui/react'

import { ChevronDownIcon } from '@chakra-ui/icons'
import { CustomRating } from '../../../../components/rating'

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

const Test = ({ data }) => {
	const { id, name, types, image, mega, variants, forms } = data
	const showMenu = mega || variants || forms

	const [pokemonData, setPokemonData] = useState({
		name,
		types,
		image
	})
	return (
		<Card
			maxW='sm'
			bgGradient={`linear(to-tl, ${pokemonData.types[0]}.default, ${
				pokemonData.types[1]
					? pokemonData.types[1] + '.default'
					: pokemonData.types[0] + '.light'
			})`}
			p='2px'
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
						mb={3}
					>
						<Image
							src={pokemonData.image}
							alt={pokemonData.image}
							borderRadius='lg'
						/>
					</Box>

					<Stack align='start' spacing={2}>
						<Flex justify='space-between' w='full' align='center'>
							<Heading size='xl'>{name}</Heading>
							<Heading size='sm' opacity={0.5}>
								&#35;{id}
							</Heading>
						</Flex>
						<Flex gap={1}>
							{pokemonData.types.map((type, index) => (
								<Image
									key={index}
									boxSize='16%'
									src={`/type/${type}.png`}
									alt={`${type}`}
								/>
							))}
						</Flex>
						<Flex align='center' justify='space-between' w='full' m={0}>
							<Flex>
								<chakra.div my={1} maxW={130}>
									<CustomRating value={2} readOnly />
								</chakra.div>
								<Text fontSize='2xl' opacity={0.4}>
									&nbsp;({1})
								</Text>
							</Flex>
							<Heading as='h1' fontSize='5xl' fontWeight='900'>
								1.1
							</Heading>
						</Flex>
					</Stack>
				</CardBody>
				{showMenu && (
					<>
						<Divider />
						<CardFooter py={1} px={3}>
							<Menu matchWidth zIndex={1}>
								<MenuButton as={MenuBtn} my={2}>
									{pokemonData.name}
								</MenuButton>
								<MenuList w='100%'>
									<MenuItem
										onClick={() =>
											setPokemonData({
												name,
												types,
												image
											})
										}
									>
										{name}
									</MenuItem>
									{mega?.map(m => (
										<MenuItem
											onClick={() =>
												setPokemonData({
													name: m.name,
													types: m.types,
													image: m.image
												})
											}
										>
											{m.name}
										</MenuItem>
									))}
									{forms?.map(f => (
										<MenuItem
											onClick={() =>
												setPokemonData({
													name: f.name,
													types: f.types,
													image: f.image
												})
											}
										>
											{f.name}
										</MenuItem>
									))}
									{variants?.map(v => (
										<MenuItem
											onClick={() =>
												setPokemonData({
													name: v.name,
													types: v.types,
													image: v.image
												})
											}
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

export default Test
