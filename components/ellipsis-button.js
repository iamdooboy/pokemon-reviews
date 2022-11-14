import {
	chakra,
	Box,
	Icon,
	Button,
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverBody,
	PopoverArrow,
	useDisclosure
} from '@chakra-ui/react'
import { useFetchReviews } from '../hooks/useFetchReviews'
import { AiOutlineEllipsis } from 'react-icons/ai'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'

export const EllipsisButton = ({
	setSelected,
	review,
	onOpen,
	pokemonName
}) => {
	const fetcher = url =>
		axios.get(url, { params: { pokemon: pokemonName } }).then(res => res.data)

	const key = `/api/reviews/${pokemonName}`

	const { remove } = useFetchReviews(key, fetcher)

	const { onClose } = useDisclosure()

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
							onClick={() => {
								remove({ id: review.id })
								onClose()
							}}
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
