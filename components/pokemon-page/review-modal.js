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
import ResizeTextarea from 'react-textarea-autosize'
import { capitalFirstLetter } from '../../utils/helpers'

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
	editReview,
	onSubmit
}) => {
	const [rating, setRating] = useState(0)
	const [hover, setHover] = useState(0)
	const [description, setDescription] = useState('')

	const onSubmitHandler = e => {
		console.log({ description, rating })
		onSubmit(e, description, rating)
		onCloseHandler()
	}

	const onCloseHandler = () => {
		setRating(0)
		setHover(0)
		setDescription('')
		onClose()
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
				{/* <form onSubmit={e => onSubmit(e, description, rating)}> */}
				<form onSubmit={onSubmitHandler}>
					<ModalContent>
						<ModalHeader>
							<Heading as='h3' size='lg'>
								Review {capitalFirstLetter(pokemonName)}
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
