import React from 'react'
import { Box, HStack, Text, Image, Heading, Flex } from '@chakra-ui/react'
import { motion, useMotionValue, useTransform } from 'framer-motion'

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

const PokemonCardLarge = ({ data }) => {
	const { id, imageAlt, imageUrl, name, typesArr } = data
	const formatName = name.charAt(0).toUpperCase() + name.slice(1)
	let paddedId = id.toString().padStart(3, '0')

	const x = useMotionValue(0)
	const y = useMotionValue(0)
	const rotateX = useTransform(y, [-100, 100], [30, -30])
	const rotateY = useTransform(x, [-100, 100], [-30, 30])

	return (
		<Box
			bgGradient={`linear(to-tl, ${typesArr[0]}.default, ${
				typesArr[1] ? typesArr[1] + '.default' : typesArr[0] + '.light'
			})`}
			p='2px'
			rounded={8}
			maxW='xs'
			as={motion.div}
			perspective={2000}
			style={{ x, y, rotateX, rotateY, z: 1 }}
			drag
			dragElastic={0.16}
			dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
			whileHover={{ cursor: 'grabbing' }}
		>
			<Box maxW='xs' rounded={8} mx='auto' bg='rgba(17, 25, 40, 0.6)'>
				<Box p={3} color='gray.100'>
					<Box
						borderWidth={2}
						rounded={4}
						bg='#282d359e'
						borderColor='whiteAlpha.600'
						as={motion.div}
						style={{ x, y, rotateX, rotateY, z: 10 }}
						drag
						dragElastic={0.12}
					>
						<Text position='absolute' opacity={0.4} px={1}>
							{paddedId}
						</Text>
						<Image src={imageUrl} alt={imageAlt} />
					</Box>
					<Flex>
						<Box align='left'>
							<Flex>
								<Heading as='h1' size='xl' fontWeight='800' letterSpacing={1}>
									{formatName}
								</Heading>
							</Flex>
							<HStack my={3}>
								{typesArr.map((type, index) => (
									<Image
										key={index}
										boxSize='30%'
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
						</Box>

						<Box w='full' align='right'>
							<Heading
								as='h1'
								fontWeight='900'
								fontSize='7xl'
								mt={6}
								position='relative'
								_before={{
									content: '""',
									position: 'absolute',
									top: '100%',
									width: '100%',
									left: '0',
									height: '5px',
									bgGradient: `linear(to-r, ${typesArr[0]}.default, ${
										typesArr[1]
											? typesArr[1] + '.default'
											: typesArr[0] + '.light'
									})`
								}}
							>
								4.5
							</Heading>
						</Box>
					</Flex>
				</Box>
			</Box>
		</Box>
	)
}

export default PokemonCardLarge