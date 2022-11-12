import React, { useState } from 'react'
import { HStack, Button } from '@chakra-ui/react'
import { MdFavoriteBorder, MdOutlineEdit, MdFavorite } from 'react-icons/md'
import { useFavorite } from '../../hooks/useFavorite'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import useSWR, { useSWRConfig } from 'swr'
import { useFetchPokemon } from '../../hooks/useFetchPokemon'

const ActionButtons = ({ onOpen, pokemonName }) => {
	const session = useSession()
	const pokemon = useFetchPokemon(pokemonName)

	if (!pokemon) return <div>loading</div>

	const { favorite, favoritedByCurrentUser, onClick } = pokemon

	const favoriteIcon = favoritedByCurrentUser ? (
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
				onClick={() => onClick()}
				colorScheme='blue'
			>
				{favorite}
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

	// const session = useSession()
	// const { mutate } = useSWRConfig()
	// const { pokemonData } = useFavorite(pokemonName, favorite)
	// if (!pokemonData) return <div>loading</div>
	// const {
	// 	favorite: numberOfFavorites,
	// 	favoritedByCurrentUser,
	// 	id
	// } = pokemonData

	// const onClickHandler = async () => {
	// 	//console.log(numberOfFavorites)
	// 	if (!session) {
	// 		alert('please login to like')
	// 		return
	// 	}
	// 	const data = {
	// 		numberOfFavorites: favoritedByCurrentUser
	// 			? numberOfFavorites - 1
	// 			: numberOfFavorites + 1,
	// 		id,
	// 		toggle: favoritedByCurrentUser
	// 	}
	// 	const newData = {
	// 		...pokemonData,
	// 		favorite: data.numberOfFavorites,
	// 		favoritedByCurrentUser: !favoritedByCurrentUser
	// 	}
	// 	const options = {
	// 		optimisticData: newData,
	// 		rollbackOnError: true,
	// 		populateCache: true,
	// 		revalidate: false
	// 	}
	// 	mutate(`/api/pokemon/${pokemonName}`, updateFn(data), options)
	// }
	// const updateFn = async data => {
	// 	const res = await axios.put('/api/pokemon', data).then(res => res.data)
	// 	console.log(res)
	// 	return res
	// }
	// return (
	// 	<HStack align='center' justify='center' mt={3} maxW='xs'>
	// 		<Button
	// 			leftIcon={favoriteIcon}
	// 			variant='outline'
	// 			w='20%'
	// 			onClick={onClickHandler}
	// 			colorScheme='blue'
	// 		>
	// 			{numberOfFavorites}
	// 		</Button>
	// 		<Button
	// 			leftIcon={<MdOutlineEdit />}
	// 			onClick={session ? onOpen : () => alert('please login to review')}
	// 			colorScheme='blue'
	// 			w='80%'
	// 		>
	// 			Leave a review
	// 		</Button>
	// 	</HStack>
	// )
}

export default ActionButtons
