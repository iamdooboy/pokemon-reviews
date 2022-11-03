import axios from 'axios'
import { useState, useRef } from 'react'
import { useDisclosure, useToast } from '@chakra-ui/react'
import { useAsyncToast } from './useAsyncToast'
import { getPokemonGenPage } from '../utils/axios'
import useSWR, { useSWRConfig } from 'swr'

export const useReview = (reviews, pokemonName, genId) => {
	const initialRef = useRef()
	const toast = useToast()
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [allReviews, setAllReviews] = useState(reviews)
	const [editReview, setEditReview] = useState(null)
	const { mutate } = useSWRConfig()
	const [_, setIsLoading] = useAsyncToast(false, {
		title: 'Loading...',
		position: 'bottom-right'
	})

	const onEdit = review => {
		setEditReview(review)
		onOpen()
	}

	const closeModal = () => {
		setEditReview(null)
		onClose()
	}

	const onDelete = async id => {
		setIsLoading(true)
		const res = await axios.delete('/api/reviews', { data: { id } })
		console.log(res.data.message)
		setAllReviews(prev => prev.filter(el => el.id !== id))
		onClose()
		setIsLoading(false)
		toast({
			title: 'Review deleted.',
			position: 'bottom-right',
			status: 'error',
			duration: 1500,
			isClosable: true
		})
	}

	const onSave = async review => {
		const response = await axios.post('/api/reviews', review)

		if (!response) {
			throw new Error('error')
		}
		setAllReviews(prev => [...prev, response.data])
		setIsLoading(false)

		toast({
			title: 'Review created.',
			position: 'bottom-right',
			status: 'success',
			duration: 1500,
			isClosable: true
		})
	}

	const onUpdate = async review => {
		const { description, rating } = review
		const oldDescription = editReview.description
		const currentDescription = description

		const oldRating = editReview.rating
		const currentRating = rating

		const didNotUpdateDescription = oldDescription === currentDescription
		const didNotUpdateRating = oldRating === currentRating

		if (didNotUpdateDescription && didNotUpdateRating) {
			return
		}

		const res = await axios.put('/api/reviews', review)
		console.log(res.data.message)

		setAllReviews(reviews => {
			const updatedArr = reviews.map(review => {
				if (review.id === editReview.id) {
					return { ...review, description: description, rating: rating }
				} else {
					return review
				}
			})
			return updatedArr
		})

		setIsLoading(false)

		toast({
			title: 'Review updated.',
			position: 'bottom-right',
			status: 'success',
			duration: 1500,
			isClosable: true
		})
	}

	const onSubmit = (e, description, rating) => {
		e.preventDefault()
		setIsLoading(true)
		if (editReview) {
			onUpdate({
				id: editReview.id,
				description,
				rating,
				updatingWhat: 'review'
			})
		} else {
			onSave({ description, rating, pokemon: pokemonName })
		}

		mutate(`/gen/${genId}`, getPokemonGenPage(genId))
	}

	return {
		initialRef,
		isOpen,
		onOpen,
		...{ onClose: closeModal },
		onEdit,
		onDelete,
		allReviews,
		editReview,
		onSubmit
	}
}
