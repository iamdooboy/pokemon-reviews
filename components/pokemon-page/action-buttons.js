import React from 'react'
import { HStack, Button } from '@chakra-ui/react'
import { MdFavoriteBorder, MdOutlineEdit, MdFavorite } from 'react-icons/md'
import { useFavorite } from '../../hooks/useFavorite'
import { useSession } from 'next-auth/react'

const ActionButtons = ({ onOpen, pokemonName, favorite }) => {
	const session = useSession()
	const { favoriteClickHandler, favoritedByUser, pokemonData } = useFavorite(
		pokemonName,
		favorite
	)

	const favoriteIcon = favoritedByUser ? (
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
				{pokemonData.favorite}
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
