import useSWR from 'swr'
import axios from 'axios'
import { useToast } from '@chakra-ui/react'
import { useAsyncToast } from './useAsyncToast'

export const useFetchReviews = (key, fetcher) => {
	const { data: reviews, mutate } = useSWR(key, fetcher)

	const toast = useToast()
	const [_, setIsLoading] = useAsyncToast(false, {
		title: 'Loading...',
		position: 'bottom-right'
	})

	let options = {
		rollbackOnError: true,
		populateCache: true,
		revalidate: false
	}

	const calcRatings = review => {
		const reviewCount = review.length

		const totalRating = review
			? review.reduce((sum, obj) => sum + obj.rating, 0)
			: 0

		let averageRating = totalRating ? totalRating / reviewCount : 0

		averageRating = Math.round(averageRating * 10) / 10

		return {
			count: reviewCount,
			rating: averageRating
		}
	}

	const postFn = async data => {
		setIsLoading(true)
		const res = await axios.post('/api/reviews', data).then(res => res.data)
		const newData = [...reviews, res]
		displayConfirmationToast('Review created')
		return newData
	}

	const updateFn = async (data, path = '') => {
		if (!path) {
			setIsLoading(true)
		}
		const res = await axios
			.put(`/api/reviews/${path}`, data)
			.then(res => res.data)

		const updatedData = reviews.map(review => {
			if (review.id !== res.id) {
				return review
			}
			return {
				...res
			}
		})

		if (!path) {
			displayConfirmationToast('Review updated')
		}

		return updatedData
	}

	const deleteFn = async data => {
		setIsLoading(true)
		const res = await axios
			.delete('/api/reviews', { data })
			.then(res => res.data)
		displayConfirmationToast('Review deleted')

		return reviews.filter(review => review.id !== res.id)
	}

	const like = selected => {
		const { id, favorite, favoritedByCurrentUser } = selected

		const newData = {
			id,
			favorite: favoritedByCurrentUser ? favorite - 1 : favorite + 1,
			favoritedByCurrentUser: !favoritedByCurrentUser
		}

		const optimisticData = reviews.map(review => {
			if (id !== review.id) {
				return review
			}
			return {
				...review,
				favorite: favoritedByCurrentUser ? favorite - 1 : favorite + 1,
				favoritedByCurrentUser: !favoritedByCurrentUser
			}
		})

		options = {
			optimisticData,
			...options
		}

		mutate(updateFn(newData, 'like'), options)
	}

	const update = data => {
		const { id, description, rating } = data

		const optimisticData = reviews.map(review => {
			if (id !== review.id) {
				return review
			}
			return { ...review, description, rating }
		})

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
		const optimisticData = reviews.filter(review => review.id !== data.id)

		options = {
			optimisticData,
			...options
		}

		mutate(deleteFn(data), options)
	}

	const displayConfirmationToast = message => {
		setIsLoading(false)
		toast({
			title: message,
			position: 'bottom-right',
			status: 'success',
			duration: 1500,
			isClosable: true
		})
	}

	return {
		reviews,
		isLoading: !reviews,
		calcRatings,
		like,
		create,
		update,
		remove
	}
}
