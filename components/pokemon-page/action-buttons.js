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

	if (isLoading) return <div>loading</div>

	const { favorite, favoritedByCurrentUser } = data

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
				onClick={() => onFavorite(data)}
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
}

export default ActionButtons
