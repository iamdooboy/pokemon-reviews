import {
	chakra,
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
	pokemonName
}) => {
	const { onMutate } = useMutation(`/api/reviews/${pokemonName}`)

	const deleteHandler = async () => {
		const data = { id: review.id, api: 'DELETE' }
		onMutate(data)
	}

	return (
		<Popover isLazy>
			<PopoverTrigger>
				<chakra.button>
					<Icon as={AiOutlineEllipsis} />
				</chakra.button>
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
