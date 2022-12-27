import useSWR from 'swr'
import axios from 'axios'
import { useToast } from '@chakra-ui/react'
import { useAsyncToast } from './useAsyncToast'

export const useFetchReviews = (key, fetcher) => {
	const { data: initialData, mutate } = useSWR(key, fetcher)

	const toast = useToast()
	const [_, setIsLoading] = useAsyncToast(false, {
		title: 'Loading...',
		position: 'bottom-right',
		isClosable: true
	})

	let options = {
		rollbackOnError: true,
		populateCache: false,
		revalidate: true
	}

	const sort = sortOrder => {
		if (initialData.reviews) {
			if (sortOrder === 1) {
				initialData.reviews.sort((a, b) => {
					return b.favorite - a.favorite
				})
			} else {
				initialData.reviews.sort((a, b) => {
					return new Date(b.createdAt) - new Date(a.createdAt)
				})
			}
		} else {
			if (sortOrder === 1) {
				initialData.sort((a, b) => {
					return b.favorite - a.favorite
				})
			} else {
				initialData.sort((a, b) => {
					return new Date(b.createdAt) - new Date(a.createdAt)
				})
			}
		}
	}

	const postFn = async data => {
		try {
			setIsLoading(true)
			const res = await axios.post('/api/reviews', data).then(res => res.data)
			const { savedReview, newAverage, newCount, duplicate } = res
			const newData = {
				reviews: [...initialData.reviews, savedReview],
				average: newAverage,
				count: newCount,
				duplicate
			}
			displayConfirmationToast('Review created')
			return newData
		} catch (error) {
			displayConfirmationToast(
				'You already posted a review for this pokemon.',
				'error',
				5000
			)
			return reviews
		}
	}

	const updateFn = async (data, path = '') => {
		if (!path) {
			setIsLoading(true)
		}
		const res = await axios
			.put(`/api/reviews/${path}`, data)
			.then(res => res.data)

		const { updatedData, newAverage, duplicate, count } = res

		const updatedReviews = initialData.reviews.map(review => {
			if (review.id !== res.id) {
				return review
			}
			return {
				...updatedData
			}
		})

		if (!path) {
			displayConfirmationToast('Review updated')
		}

		return { reviews: updatedReviews, average: newAverage, count, duplicate }
	}

	const deleteFn = async data => {
		setIsLoading(true)
		const res = await axios
			.delete('/api/reviews', { data })
			.then(res => res.data)

		const { updatedData, average, count, duplicate } = res
		displayConfirmationToast('Review deleted')

		const updatedReviews = initialData.reviews.filter(
			review => review.id !== updatedData.id
		)

		return { reviews: updatedReviews, average, count, duplicate }
	}

	const like = ({ review: selected, count, average, duplicate }) => {
		const { id, favorite, favoritedByCurrentUser } = selected

		const newData = {
			id,
			favorite: favoritedByCurrentUser ? favorite - 1 : favorite + 1,
			favoritedByCurrentUser: !favoritedByCurrentUser,
			count,
			average,
			duplicate
		}

		const updatedReviews = initialData.reviews.map(review => {
			if (id !== review.id) {
				return review
			}
			return {
				...review,
				favorite: favoritedByCurrentUser ? favorite - 1 : favorite + 1,
				favoritedByCurrentUser: !favoritedByCurrentUser
			}
		})

		const optimisticData = {
			reviews: updatedReviews,
			count,
			average,
			duplicate
		}

		options = {
			optimisticData,
			...options
		}

		mutate(updateFn(newData, 'like'), options)
	}

	const update = data => {
		const { id, description, rating, count, average, oldRating } = data
		const sum = average * count - oldRating + rating
		console.log(sum)
		const newAverage = Math.round((sum / count) * 10) / 10
		const updatedReviews = initialData.reviews.map(review => {
			if (id !== review.id) {
				return review
			}
			return { ...review, description, rating }
		})

		const optimisticData = {
			reviews: updatedReviews,
			average: newAverage,
			count,
			duplicate: true
		}

		options = {
			optimisticData,
			...options
		}

		mutate(updateFn(data), options)
	}

	const create = data => {
		mutate(postFn(data), options)
	}

	const remove = data => {
		const { review: currentReview, count, average } = data

		const { id, rating } = currentReview
		const newCount = count - 1

		const sum = average * count - rating
		const newAverage = Math.round((sum / newCount) * 10) / 10

		const updatedReviews = initialData.reviews.filter(
			review => review.id !== id
		)

		const optimisticData = {
			reviews: updatedReviews,
			count: newCount,
			average: newAverage,
			duplicate: false
		}

		options = {
			optimisticData,
			...options
		}

		mutate(deleteFn(data), options)
	}

	const displayConfirmationToast = (
		message,
		status = 'success',
		duration = 1500
	) => {
		setIsLoading(false)
		toast({
			title: message,
			position: 'bottom-right',
			status,
			duration,
			isClosable: true
		})
	}

	return {
		reviews: initialData,
		isLoading: !initialData,
		like,
		create,
		update,
		remove,
		sort
	}
}
