import React, { useEffect, useState, useRef } from 'react'
import {
	Box,
	HStack,
	Text,
	Image,
	Heading,
	Flex,
	Skeleton,
	Stack
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { FallBackImage } from '../../utils/fallback-image'
import { formatNames, capitalFirstLetter } from '../../utils/helpers'

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

const CardSkeleton = (
	<Stack maxW='xs' p={3} rounded={8} mx='auto'>
		<Skeleton h='19.2rem' w='100%' />
		<Stack isInline align='center' marginBottom='5px'>
			<Box align='left' w='100%'>
				<Skeleton my={1} h='30px' w='100%' />
				<Flex gap={3}>
					<Skeleton h='20px' w='35%' />
					<Skeleton h='20px' w='35%' />
				</Flex>
				<Skeleton my={1} h='20px' w='100%' />
			</Box>
			<Box w='100%' align='right'>
				<Skeleton h='60px' w='50%' mt={5} />
			</Box>
		</Stack>
	</Stack>
)

const PokemonCard = ({ data }) => {
	const router = useRouter()
	const { id, imageAlt, imageUrl, name, typesArr } = data
	const [isLoaded, setIsLoaded] = useState(true)
	const formattedName = capitalFirstLetter(formatNames(name))
	let paddedId = id.toString().padStart(3, '0')
	const log = useRef(true)

	useEffect(() => {
		const handleStart = url => {
			console.log(url)
			setIsLoaded(false)
		}

		const handleStop = url => {
			console.log(url)
			setIsLoaded(true)
		}

		router.events.on('routeChangeStart', handleStart)
		router.events.on('routeChangeComplete', handleStop)
		router.events.on('routeChangeError', handleStop)

		return () => {
			router.events.off('routeChangeStart', handleStart)
			router.events.off('routeChangeComplete', handleStop)
			router.events.off('routeChangeError', handleStop)
		}
	}, [router])

	return (
		<Box
			bgGradient={`linear(to-tl, ${typesArr[0]}.default, ${
				typesArr[1] ? typesArr[1] + '.default' : typesArr[0] + '.light'
			})`}
			p='2px'
			rounded={8}
			maxW='xs'
			pos='relative'
			zIndex={-1}
		>
			{isLoaded ? (
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
							{paddedId}
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
							{formattedName}
						</Heading>
						<HStack>
							<Stack>
								<HStack>
									{typesArr.map((type, index) => (
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
									bgGradient: `linear(to-r, ${typesArr[0]}.default, ${
										typesArr[1]
											? typesArr[1] + '.default'
											: typesArr[0] + '.light'
									})`
								}}
							>
								4.5
							</Heading>
						</HStack>
					</Box>
				</Box>
			) : (
				CardSkeleton
			)}
		</Box>
	)
}

export default PokemonCard
