import { forwardRef, useState, useEffect } from 'react'
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

const AutoResizeTextarea = forwardRef((props, ref) => {
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
	pokemon,
	isOpen,
	onClose,
	initialRef,
	selected,
	setSelected,
	create,
	update
}) => {
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
		if (selected.description) {
			const data = { ...selected, description, rating }
			update(data)
		} else {
			const data = { description, rating, pokemon }
			create(data)
		}
		onCloseHandler()
	}

	const onCloseHandler = () => {
		setRating(0)
		setDescription('')
		setSelected({ description: '', rating: 0 })
		onClose()
	}

	let formattedName = formatNames(
		selected.description ? selected.pokemon : pokemon
	)
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
