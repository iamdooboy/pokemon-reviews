import { HStack, Button, useDisclosure } from '@chakra-ui/react'
import { MdFavoriteBorder, MdOutlineEdit, MdFavorite } from 'react-icons/md'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import { useFetchPokemon } from '../../hooks/useFetchPokemon'
import { useFetchReviews } from '../../hooks/useFetchReviews'
import ErrorModal from './error-modal'
import { useState } from 'react'

const ActionButtons = ({ onOpen, swrData }) => {
	const session = useSession()
	const errorModal = useDisclosure()
	const [error, setError] = useState({
		title: 'Authorization Error',
		message: 'Please sign up or log in to review this pokemon.'
	})
	const { pokemon: pokemonName } = swrData
	const fetcher = url => axios.get(url).then(res => res.data)

	const key = `/api/pokemon/${pokemonName}`

	const options = {
		revalidateIfStale: true,
		revalidateOnFocus: true
	}
	const { data, isLoading, onFavorite } = useFetchPokemon(key, fetcher, options)
	const { reviews } = useFetchReviews(swrData.key, swrData.fetcher)

	const posted = reviews?.some(review => review.reviewedThisPokemon === true)

	const { favorite, favoritedByCurrentUser } = data || {}

	const favoriteIcon = favoritedByCurrentUser ? (
		<MdFavorite color='#E53E3E' />
	) : (
		<MdFavoriteBorder />
	)

	const onClickHandler = () => {
		if (posted) {
			setError({
				title: 'Duplicate Error',
				message: 'You already posted a review for this Pokemon.'
			})
			errorModal.onOpen()
			return
		}
		if (session.data) {
			onOpen()
		} else {
			errorModal.onOpen()
		}
	}

	return (
		<>
			<HStack align='center' justify='center' maxW='sm' mt={3} h={12}>
				<Button
					isLoading={isLoading}
					leftIcon={favoriteIcon}
					variant='outline'
					w='20%'
					onClick={
						session.data ? () => onFavorite(data) : () => errorModal.onOpen()
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
					onClick={onClickHandler}
					cursor={session.data ? 'pointer' : 'not-allowed'}
					colorScheme='blue'
					w='80%'
				>
					Leave a review
				</Button>
			</HStack>
			<ErrorModal errorModal={errorModal} error={error} />
		</>
	)
}

export default ActionButtons
