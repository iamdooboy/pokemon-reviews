'use client'
import {
	chakra,
	Box,
	HStack,
	Text,
	Image,
	Heading,
	Flex,
	Stack,
	Button,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	MenuDivider,
	forwardRef
} from '@chakra-ui/react'
//import { usePokeAPI } from '../../hooks/usePokeAPI'
import React, { useState } from 'react'
import NextImage from 'next/image'
import { ChevronDownIcon } from '@chakra-ui/icons'

const MenuBtn = forwardRef((props, ref) => {
	return (
		<Button
			bgColor='gray.700'
			rightIcon={<ChevronDownIcon />}
			my={2}
			size='sm'
			w='full'
			maxW='xs'
			justifyContent='space-between'
			_hover={{ bgColor: 'gray.600' }}
			_active={{ bgColor: 'gray.600' }}
			ref={ref}
			{...props}
		>
			Based form
		</Button>
	)
})
const Card = ({ data }) => {
	const { id, name, types, image, mega, variants, forms } = data

	return (
		<>
			<Box
				bgGradient={`linear(to-tl, ${types[0]}.default, ${
					types[1] ? types[1] + '.default' : types[0] + '.light'
				})`}
				p='2px'
				rounded={8}
				maxW='xs'
				//pos='relative'
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
							<NextImage
								w='auto'
								h='auto'
								width={600}
								height={600}
								src={image}
								alt={image}
								fallback='/bug.svg'
								placeholder='blur'
								blurDataURL={image}
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
								{/* <Flex align='center' mt={4}>
								<chakra.div my={1} maxW={100}>
									<CustomRating value={rating} readOnly />
								</chakra.div>
								<Text fontSize='lg' opacity={0.4}>
									&nbsp;({count})
								</Text>
							</Flex> */}
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
								{/* {rating.toFixed(1)} */}1
							</Heading>
						</HStack>
					</Box>
					<Menu matchWidth>
						<MenuButton w='full' maxW='xs' as={MenuBtn} my={2}>
							forms
						</MenuButton>
						<MenuList maxW='xs' w='100%'>
							<MenuItem>test</MenuItem>
							<MenuItem>test</MenuItem>
							<MenuItem>test</MenuItem>
						</MenuList>
					</Menu>
				</Box>
			</Box>
		</>
	)
}

export default Card
