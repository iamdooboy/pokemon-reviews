import React from 'react'
import { HStack, Button } from '@chakra-ui/react'
import { MdFavoriteBorder, MdOutlineEdit, MdFavorite } from 'react-icons/md'

const ActionButtons = ({
	favoriteClickHandler,
	numberOfFavorites,
	favorite,
	session,
	onOpen
}) => {
	const favoriteIcon = favorite ? (
		<MdFavorite color='#E53E3E' />
	) : (
		<MdFavoriteBorder />
	)
	return (
		<HStack align='center' justify='center' mt={3} maxW='xs'>
			<Button
				leftIcon={favoriteIcon}
				variant='outline'
				w='20%'
				onClick={favoriteClickHandler}
				colorScheme='blue'
			>
				{numberOfFavorites}
			</Button>
			<Button
				leftIcon={<MdOutlineEdit />}
				onClick={session ? onOpen : () => alert('please login to review')}
				colorScheme='blue'
				w='80%'
			>
				Leave a review
			</Button>
		</HStack>
	)
}

export default ActionButtons
