import {
	Box,
	Icon,
	Button,
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverBody,
	PopoverArrow
} from '@chakra-ui/react'
import { useMutation } from '../hooks/useMutation'
import { AiOutlineEllipsis } from 'react-icons/ai'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'

export const EllipsisButton = ({
	setSelected,
	review,
	onOpen,
	reviews,
	pokemonName
}) => {
	const { onMutate } = useMutation(pokemonName)
	const updateFn = async (reviews, data) => {
		const res = await axios
			.delete('/api/reviews', {
				data: data
			})
			.then(res => res.data)

		return reviews.filter(rev => rev.id !== res.id)
	}

	const deleteHandler = async () => {
		const data = { id: review.id, api: 'DELETE' }
		onMutate(data)
	}

	return (
		<Popover isLazy>
			<PopoverTrigger>
				<button>
					<Icon as={AiOutlineEllipsis} />
				</button>
			</PopoverTrigger>
			<PopoverContent w='150px'>
				<PopoverArrow />
				<PopoverBody p={0}>
					<Box>
						<Button
							onClick={() => {
								onOpen()
								setSelected(review)
							}}
							leftIcon={<EditIcon />}
							variant='ghost'
							w='full'
							rounded='none'
							justifyContent='start'
						>
							Edit
						</Button>
						<Button
							onClick={deleteHandler}
							leftIcon={<DeleteIcon />}
							variant='ghost'
							w='full'
							rounded='none'
							justifyContent='start'
						>
							Delete
						</Button>
					</Box>
				</PopoverBody>
			</PopoverContent>
		</Popover>
	)
}
