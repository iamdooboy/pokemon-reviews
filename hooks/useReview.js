import axios from 'axios'
import { useState, useRef } from 'react'
import { useDisclosure } from '@chakra-ui/react'

export const useReview = (reviews, pokemonName) => {
	const initialRef = useRef()
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [allReviews, setAllReviews] = useState(reviews)
	const [editReview, setEditReview] = useState(null)

	const onEdit = review => {
		setEditReview(review)
		onOpen()
	}

	const closeModal = () => {
		setEditReview(null)
		onClose()
	}

	const onDelete = async id => {
		const res = await axios.delete('/api/reviews', { data: { id } })
		console.log(res.data.message)
		setAllReviews(prev => prev.filter(el => el.id !== id))
		onClose()
	}

	const onSave = async review => {
		const response = await axios.post('/api/reviews', review)

		if (!response) {
			throw new Error('error')
		}
		setAllReviews(prev => [...prev, response.data])
		return response
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
	}

	const onSubmit = (e, description, rating) => {
		e.preventDefault()

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
