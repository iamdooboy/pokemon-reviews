import React from 'react'
import { Flex, Text } from '@chakra-ui/react'
import { FaThumbsUp, FaRegThumbsUp } from 'react-icons/fa'
import { StarIcon } from '@chakra-ui/icons'
import { useLike } from '../../hooks/useLike'

const AddOn = ({ pokemonName, review }) => {
	const { onLike } = useLike(pokemonName, review)

	const favoriteIcon = review.favorite ? (
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
							color={index <= review.rating ? '#f59e0b' : 'gray'}
						/>
					)
				})}
			</Flex>
			<Flex gap={1}>
				<button onClick={() => onLike(review)}>{favoriteIcon}</button>
				<Text fontSize='sm'>{review.favorite}</Text>
			</Flex>
		</Flex>
	)
}

export default AddOn
