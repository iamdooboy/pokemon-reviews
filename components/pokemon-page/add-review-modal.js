import React, { useState, useEffect } from 'react'
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	FormControl,
	Flex,
	Textarea,
	FormHelperText,
	Spacer,
	Heading,
	Text
} from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'
import axios from 'axios'
import ResizeTextarea from 'react-textarea-autosize'

const AutoResizeTextarea = React.forwardRef((props, ref) => {
	return (
		<Textarea
			minH='unset'
			overflow='hidden'
			w='100%'
			resize='none'
			ref={ref}
			minRows={3}
			as={ResizeTextarea}
			{...props}
		/>
	)
})

const ReviewModal = ({
	pokemonName,
	isOpen,
	onClose,
	initialRef,
	setAllReviews,
	editReview,
	setEditReview
}) => {
	const [rating, setRating] = useState(0)
	const [hover, setHover] = useState(0)
	const [description, setDescription] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const formatName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)

	const onCloseHandler = () => {
		setRating(0)
		setHover(0)
		setDescription('')
		setEditReview(null)
		onClose()
	}

	const submitHandler = e => {
		e.preventDefault()
		setIsLoading(true)

		if (editReview) {
			updateReview({
				id: editReview.id,
				description,
				rating,
				updatingWhat: 'review'
			})
		} else {
			saveReview({ description, rating, pokemon: pokemonName })
		}
		setIsLoading(false)
		onCloseHandler()
	}

	const saveReview = async review => {
		const response = await axios.post('/api/reviews', review)

		if (!response) {
			throw new Error('error')
		}
		setAllReviews(prev => [...prev, response.data])
		return response
	}

	const updateReview = async review => {
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

	useEffect(() => {
		if (editReview) {
			setDescription(editReview.description)
			setRating(editReview.rating)
		}
	}, [editReview])

	return (
		<>
			<Modal
				isCentered
				isOpen={isOpen}
				onClose={onCloseHandler}
				initialFocusRef={initialRef}
			>
				<ModalOverlay />
				<form onSubmit={submitHandler}>
					<ModalContent>
						<ModalHeader>
							<Heading as='h3' size='lg'>
								Review {formatName}
							</Heading>
						</ModalHeader>
						<ModalCloseButton />
						<ModalBody>
							<FormControl isRequired={true}>
								<AutoResizeTextarea
									onChange={event => setDescription(event.target.value)}
									value={description}
									placeholder='Share your thoughts on this Pokemon'
								/>
								{description.length < 10 && (
									<FormHelperText>
										<Flex>
											Review must have a minimum of&nbsp;
											<Text textDecoration='underline'>
												{10 - description.length}
											</Text>
											&nbsp;characters.
										</Flex>
									</FormHelperText>
								)}
							</FormControl>
						</ModalBody>

						<ModalFooter justifyContent='left'>
							<Flex>
								{Array.from(Array(5).keys()).map((id, index) => {
									index += 1
									return (
										<StarIcon
											boxSize={5}
											key={id}
											mr={2}
											color={index <= (hover || rating) ? 'gold' : 'gray'}
											onClick={() => setRating(index)}
											onMouseEnter={() => setHover(index)}
											onMouseLeave={() => setHover(rating)}
										/>
									)
								})}
							</Flex>
							<Spacer />
							<Button
								align='right'
								type='submit'
								colorScheme='blue'
								isLoading={isLoading}
								isDisabled={
									rating > 0 && description.length >= 10 ? false : true
								}
							>
								{editReview ? 'Update' : 'Submit'}
							</Button>
						</ModalFooter>
					</ModalContent>
				</form>
			</Modal>
		</>
	)
}

export default ReviewModal
