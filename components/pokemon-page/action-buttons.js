import { HStack, Button, useDisclosure } from '@chakra-ui/react'
import { MdFavoriteBorder, MdOutlineEdit, MdFavorite } from 'react-icons/md'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import { useFetchPokemon } from '../../hooks/useFetchPokemon'
import { useFetchReviews } from '../../hooks/useFetchReviews'
import ErrorModal from './error-modal'

const ActionButtons = ({ onOpen, swrData }) => {
	const session = useSession()
	const error = useDisclosure()
	const { pokemon: pokemonName } = swrData
	const fetcher = url =>
		axios.get(url, { params: { pokemon: pokemonName } }).then(res => res.data)

	const key = `/api/pokemon/${pokemonName}`

	const options = {
		revalidateIfStale: true,
		revalidateOnFocus: true
	}
	const { data, isLoading, onFavorite } = useFetchPokemon(key, fetcher, options)
	const { reviews } = useFetchReviews(swrData.key, swrData.fetcher)

	const posted = reviews?.some(review => review.reviewedThisPokemon === true)

	console.log(session.data)
	const { favorite, favoritedByCurrentUser } = data || {}

	const favoriteIcon = favoritedByCurrentUser ? (
		<MdFavorite color='#E53E3E' />
	) : (
		<MdFavoriteBorder />
	)

	const onClickHandler = () => {
		if (posted) {
			error.onOpen()
			return
		}
		if (session.data) {
			onOpen()
		} else {
			alert('please login to review')
		}
	}

	return (
		<>
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
					onClick={
						// session.data ? onOpen : () => alert('please login to review')
						onClickHandler
					}
					cursor={session.data ? 'pointer' : 'not-allowed'}
					colorScheme='blue'
					w='80%'
				>
					Leave a review
				</Button>
			</HStack>
			<ErrorModal error={error} />
		</>
	)
}

export default ActionButtons
