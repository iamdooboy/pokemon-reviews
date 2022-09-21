import React, { useState } from 'react'
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	Button,
	FormControl,
	Flex,
	Textarea,
	FormHelperText,
	Spacer,
	Heading
} from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'

const CommentModal = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [rating, setRating] = useState(0)
	const [hover, setHover] = useState(0)
	const [description, setDescription] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const onCloseHandler = () => {
		setRating(0)
		setHover(0)
		setDescription('')
		onClose()
	}

	const submitHandler = async e => {
		e.preventDefault()
	}

	return (
		<>
			<Button mt={2} onClick={onOpen}>
				Leave a review
			</Button>
			<Modal isCentered isOpen={isOpen} onClose={onCloseHandler}>
				<ModalOverlay />
				<form onSubmit={submitHandler}>
					<ModalContent>
						<ModalHeader>
							<Heading as='h3' size='lg'>
								Review Pikachu
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

export default CommentModal
