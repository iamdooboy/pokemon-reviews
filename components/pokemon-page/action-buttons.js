import { HStack, Button } from '@chakra-ui/react'
import { MdFavoriteBorder, MdOutlineEdit, MdFavorite } from 'react-icons/md'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import { useFetchPokemon } from '../../hooks/useFetchPokemon'

const ActionButtons = ({ onOpen, pokemonName }) => {
	const session = useSession()

	const fetcher = url =>
		axios.get(url, { params: { pokemon: pokemonName } }).then(res => res.data)

	const key = `/api/pokemon/${pokemonName}`

	const options = {
		revalidateIfStale: true,
		revalidateOnFocus: true
	}
	const { data, isLoading, onFavorite } = useFetchPokemon(key, fetcher, options)

	const { favorite, favoritedByCurrentUser } = data || {}

	const favoriteIcon = favoritedByCurrentUser ? (
		<MdFavorite color='#E53E3E' />
	) : (
		<MdFavoriteBorder />
	)

	return (
		<HStack align='center' justify='center' mt={3} maxW='xs'>
			<Button
				isLoading={isLoading}
				leftIcon={favoriteIcon}
				variant='outline'
				w='20%'
				onClick={
					session.data
						? () => onFavorite(data)
						: () => alert('please login to favorite')
				}
				colorScheme='blue'
				cursor={session.data ? 'pointer' : 'not-allowed'}
			>
				{favorite}
			</Button>
			<Button
				isLoading={isLoading}
				loadingText='Leave a review'
				spinner={null}
				leftIcon={<MdOutlineEdit />}
				onClick={session.data ? onOpen : () => alert('please login to review')}
				cursor={session.data ? 'pointer' : 'not-allowed'}
				colorScheme='blue'
				w='80%'
			>
				Leave a review
			</Button>
		</HStack>
	)
}

export default ActionButtons
