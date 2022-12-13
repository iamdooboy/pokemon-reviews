'use client'

import Image from 'next/image'
import { chakra, Box, GridItem, Text, Flex } from '@chakra-ui/react'
import { usePokeAPI } from '../../../hooks/usePokeAPI'
import { FallBackImage } from '../../../utils/fallback-image'
import { CustomRating } from '../../../components/rating.js'
import { useFetchReviews } from '../../../hooks/useFetchReviews'
import useSWR from 'swr'
import Link from 'next/link'
import axios from 'axios'
import { Rating, ThinRoundedStar } from '@smastrom/react-rating'
import { motion } from 'framer-motion'

const PokemonGridItem = ({ id, name, image }) => {
	const fetcher = url =>
		axios.get(url, { params: { pokemon: name } }).then(res => res.data)

	const key = `/api/reviews/${name}`

	const { reviews, isLoading, calcRatings } = useFetchReviews(key, fetcher)

	if (isLoading) return <div>loading</div>

	const { count, rating } = calcRatings(reviews)

	const customStyles = {
		itemShapes: ThinRoundedStar,
		activeFillColor: '#f59e0b',
		inactiveFillColor: '#808080'
	}

	return (
		<GridItem>
			<Box
				as={motion.div}
				whileHover={{ scale: 1.1 }}
				rounded={8}
				borderWidth='1px'
				shadow='lg'
				transition='0.08s linear'
				_hover={{ borderColor: 'whiteAlpha.800', bg: 'gray.700' }}
			>
				<Text pr={1} align='right' color='gray.600'>
					{id}
				</Text>
				<Box align='center'>
					<FallBackImage
						w='auto'
						h='auto'
						width={100}
						height={100}
						src={image}
						alt={name}
						fallbackSrc='/fallback.png'
						zIndex={0}
					/>
				</Box>
				<Box>
					<Text
						fontWeight='bold'
						as='h1'
						lineHeight='tight'
						noOfLines={1}
						align='center'
					>
						{name}
					</Text>
					<Box justifyContent='center' align='center'>
						<chakra.div my={1} maxW={100}>
							<CustomRating value={rating} readOnly />
						</chakra.div>
						<Box color='gray.600' fontSize='sm' align='center' mb={2}>
							{count} ratings
						</Box>
					</Box>
				</Box>
			</Box>
		</GridItem>
	)
}

export default PokemonGridItem
