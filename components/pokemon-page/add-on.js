import React from 'react'
import { Flex, Text } from '@chakra-ui/react'
import { FaThumbsUp, FaRegThumbsUp } from 'react-icons/fa'
import { StarIcon } from '@chakra-ui/icons'
import { useFavorite } from '../../hooks/useFavorite'

const AddOn = ({ id, favorite: numOfFav, rating, didUserFavoriteReview }) => {
	const { favoriteClickHandler, numberOfFavorites, favorite } = useFavorite(
		'review',
		id,
		numOfFav,
		didUserFavoriteReview
	)

	const favoriteIcon = favorite ? (
		<FaThumbsUp color='#38B2AC' />
	) : (
		<FaRegThumbsUp />
	)

	return (
		<Flex align='center' justify='space-between' mt={2}>
			<Flex>
				{Array.from(Array(5).keys()).map((id, index) => {
					index += 1
					return (
						<StarIcon
							boxSize={3}
							key={id}
							mr={2}
							color={index <= rating ? '#f59e0b' : 'gray'}
						/>
					)
				})}
			</Flex>
			<Flex gap={1}>
				<button onClick={() => favoriteClickHandler()}>{favoriteIcon}</button>
				<Text fontSize='sm'>{numberOfFavorites}</Text>
			</Flex>
		</Flex>
	)
}

export default AddOn
