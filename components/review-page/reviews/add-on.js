import React, { useState } from 'react'
import { Flex, Text } from '@chakra-ui/react'
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md'
import { StarIcon } from '@chakra-ui/icons'

const AddOn = ({ rating }) => {
	const [favorite, setFavorite] = useState(false)

	const favoriteIcon = favorite ? (
		<MdFavorite color='#E53E3E' />
	) : (
		<MdFavoriteBorder />
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
							color={index <= rating ? 'gold' : 'gray'}
						/>
					)
				})}
			</Flex>
			<Flex gap={1}>
				<button onClick={() => setFavorite(!favorite)}>{favoriteIcon}</button>
				<Text fontSize='sm'>0</Text>
			</Flex>
		</Flex>
	)
}

export default AddOn

{
	/* <Button
    leftIcon={favoriteIcon}
    variant='outline'
    w='20%'
    onClick={() => setFavorite(!favorite)}
    colorScheme='blue'
>
    1
</Button> */
}
