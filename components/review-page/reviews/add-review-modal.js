import React, { useState } from 'react'
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
	Heading
} from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'
import axios from 'axios'

const ReviewModal = ({
	pokemonName,
	isOpen,
	onClose,
	initialRef,
	setAllReviews
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
		onClose()
	}

	const saveReview = async review => {
		const response = await axios.post('/api/reviews', review)

		if (!response) {
			throw new Error('error')
		}
		setAllReviews(prev => [...prev, response.data])
		return response
	}

	const submitHandler = e => {
		e.preventDefault()
		setIsLoading(true)
		saveReview({ description, rating, pokemon: pokemonName })
		setIsLoading(false)
		onCloseHandler()
	}

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
								<Textarea
									onChange={event => setDescription(event.target.value)}
									value={description}
									placeholder='Add your review'
								/>
								{description.length < 10 && (
									<FormHelperText>
										{`Description must have more than ${
											10 - description.length
										} characters.`}
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
								Submit
							</Button>
						</ModalFooter>
					</ModalContent>
				</form>
			</Modal>
		</>
	)
}

export default ReviewModal
