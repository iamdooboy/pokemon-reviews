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
import ResizeTextarea from 'react-textarea-autosize'
import { capitalFirstLetter, formatNames } from '../../utils/helpers'
import { CustomRating } from '../rating'
import { useMutation } from '../../hooks/useMutation'

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

AutoResizeTextarea.displayName = 'AutoResizeTextarea'

const ReviewModal = ({
	pokemonName,
	isOpen,
	onClose,
	initialRef,
	selected,
	setSelected
}) => {
	const { onMutate } = useMutation(`/api/reviews/${pokemonName}`)
	const [rating, setRating] = useState(0)
	const [description, setDescription] = useState('')

	useEffect(() => {
		if (selected.description) {
			setRating(selected.rating)
			setDescription(selected.description)
		}
	}, [selected])

	const onSubmitHandler = async e => {
		e.preventDefault()

		let data = { description, rating, pokemon: pokemonName, api: 'POST' }

		if (selected.description) {
			data = { ...selected, description, rating, api: 'PUT_REVIEW' }
		}

		onMutate(data)
		onCloseHandler()
	}

	const onCloseHandler = () => {
		setRating(0)
		setDescription('')
		setSelected({ description: '', rating: 0 })

		onClose()
	}

	let formattedName = formatNames(pokemonName)
	formattedName = capitalFirstLetter(formattedName)

	return (
		<Modal
			isCentered
			isOpen={isOpen}
			onClose={onCloseHandler}
			initialFocusRef={initialRef}
		>
			<ModalOverlay />
			<form onSubmit={onSubmitHandler}>
				<ModalContent>
					<ModalHeader>
						<Heading as='h3' size='lg'>
							Review {formattedName}
						</Heading>
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<FormControl isRequired={true}>
							<AutoResizeTextarea
								onChange={e => setDescription(e.target.value)}
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
						<Flex maxW={150}>
							<CustomRating
								value={rating}
								onChange={setRating}
								spaceBetween='small'
							/>
						</Flex>
						<Spacer />
						<Button
							align='right'
							type='submit'
							colorScheme='blue'
							isDisabled={rating > 0 && description.length >= 10 ? false : true}
						>
							{selected.description ? 'Update' : 'Submit'}
						</Button>
					</ModalFooter>
				</ModalContent>
			</form>
		</Modal>
	)
}

export default ReviewModal
