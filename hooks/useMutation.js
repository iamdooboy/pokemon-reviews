import axios from 'axios'
import { useToast } from '@chakra-ui/react'
import { useAsyncToast } from './useAsyncToast'
import useSWR from 'swr'

export const useMutation = pokemonName => {
	const { data: reviews, error, mutate } = useSWR(`/api/reviews/${pokemonName}`)
	const toast = useToast()
	const [_, setIsLoading] = useAsyncToast(false, {
		title: 'Loading...',
		position: 'bottom-right'
	})

	const updateLocal = data => {
		let localData = []

		if (data.api === 'PUT_REVIEW_LIKES') {
			const { id, favorite, favoritedByCurrentUser } = data
			localData = reviews.map(review => {
				if (id !== review.id) {
					return review
				}
				return {
					...review,
					favorite,
					favoritedByCurrentUser: !favoritedByCurrentUser
				}
			})
		} else if (data.api === 'PUT_REVIEW') {
			const { id, description, rating } = data
			localData = reviews.map(review => {
				if (id !== review.id) {
					return review
				}
				return { ...review, description, rating }
			})
		} else {
			localData = reviews.filter(review => review.id !== data.id)
		}

		return localData
	}

	const updateFn = async data => {
		let message
		let res
		let newData

		setIsLoading(true)
		if (data.api === 'POST') {
			res = await axios.post('/api/reviews', data).then(res => res.data)
			newData = [...reviews, res]
			message = 'Review created.'
		} else if (data.api === 'DELETE') {
			res = await axios.delete('/api/reviews', { data }).then(res => res.data)
			newData = reviews.filter(review => review.id !== res.id)
			message = 'Review deleted.'
		} else {
			res = await axios.put('/api/reviews', data).then(res => res.data)
			newData = reviews.map(review => {
				if (review.id !== res.id) {
					return review
				}
				return {
					...res
				}
			})

			message = 'Review updated.'
		}
		setIsLoading(false)
		toast({
			title: message,
			position: 'bottom-right',
			status: 'success',
			duration: 1500,
			isClosable: true
		})

		return newData
	}

	const onMutate = data => {
		let options = {
			rollbackOnError: true,
			populateCache: true,
			revalidate: false
		}

		if (
			data.api === 'PUT' ||
			data.api === 'PUT_REVIEW_LIKES' ||
			data.api === 'DELETE'
		) {
			const localData = updateLocal(data)
			options = {
				...options,
				optimisticData: localData
			}
		}

		mutate(updateFn(data), options)
	}

	return {
		reviews,
		isLoading: !error && !reviews,
		isError: error,
		mutate,
		onMutate
	}
}
// export const useMutation = (reviews, pokemonName, genId) => {
// 	const initialRef = useRef()
// 	const toast = useToast()
// 	const { isOpen, onOpen, onClose } = useDisclosure()
// 	const [allReviews, setAllReviews] = useState(reviews)
// 	const [editReview, setEditReview] = useState(null)
// 	const { mutate } = useSWRConfig()
// 	const [_, setIsLoading] = useAsyncToast(false, {
// 		title: 'Loading...',
// 		position: 'bottom-right'
// 	})

// 	const onEdit = review => {
// 		setEditReview(review)
// 		onOpen()
// 	}

// 	const closeModal = () => {
// 		setEditReview(null)
// 		onClose()
// 	}

// 	const onDelete = async id => {
// 		setIsLoading(true)
// 		const res = await axios.delete('/api/reviews', { data: { id } })
// 		console.log(res.data.message)
// 		setAllReviews(prev => prev.filter(el => el.id !== id))
// 		onClose()
// 		setIsLoading(false)
// 		toast({
// 			title: 'Review deleted.',
// 			position: 'bottom-right',
// 			status: 'error',
// 			duration: 1500,
// 			isClosable: true
// 		})
// 	}

// 	const onSave = async review => {
// 		const response = await axios.post('/api/reviews', review)

// 		if (!response) {
// 			throw new Error('error')
// 		}
// 		setAllReviews(prev => [...prev, response.data])
// 		setIsLoading(false)

// 		toast({
// 			title: 'Review created.',
// 			position: 'bottom-right',
// 			status: 'success',
// 			duration: 1500,
// 			isClosable: true
// 		})
// 	}

// 	const onUpdate = async review => {
// 		const { description, rating } = review
// 		const oldDescription = editReview.description
// 		const currentDescription = description

// 		const oldRating = editReview.rating
// 		const currentRating = rating

// 		const didNotUpdateDescription = oldDescription === currentDescription
// 		const didNotUpdateRating = oldRating === currentRating

// 		if (didNotUpdateDescription && didNotUpdateRating) {
// 			return
// 		}

// 		const res = await axios.put('/api/reviews', review)
// 		console.log(res.data.message)

// 		setAllReviews(reviews => {
// 			const updatedArr = reviews.map(review => {
// 				if (review.id === editReview.id) {
// 					return { ...review, description: description, rating: rating }
// 				} else {
// 					return review
// 				}
// 			})
// 			return updatedArr
// 		})

// 		setIsLoading(false)

// 		toast({
// 			title: 'Review updated.',
// 			position: 'bottom-right',
// 			status: 'success',
// 			duration: 1500,
// 			isClosable: true
// 		})
// 	}

// 	const onSubmit = (e, description, rating) => {
// 		e.preventDefault()
// 		setIsLoading(true)
// 		if (editReview) {
// 			onUpdate({
// 				id: editReview.id,
// 				description,
// 				rating,
// 				updatingWhat: 'review'
// 			})
// 		} else {
// 			onSave({ description, rating, pokemon: pokemonName })
// 		}

// 		mutate(`/gen/${genId}`, getPokemonGenPage(genId))
// 	}

// 	return {
// 		initialRef,
// 		isOpen,
// 		onOpen,
// 		...{ onClose: closeModal },
// 		onEdit,
// 		onDelete,
// 		allReviews,
// 		editReview,
// 		onSubmit
// 	}
// }
