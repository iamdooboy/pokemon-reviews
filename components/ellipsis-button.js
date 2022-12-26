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
import { AiOutlineEllipsis } from 'react-icons/ai'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import { useRef } from 'react'

export const EllipsisButton = ({
	setSelected,
	review,
	onOpen,
	remove,
	count,
	average,
	duplicate
}) => {
	const initRef = useRef()
	return (
		<Popover initialFocusRef={initRef}>
			{({ onClose }) => (
				<>
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
									ref={initRef}
									onClick={() => {
										onClose()
										remove({ review, count, average, duplicate })
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
				</>
			)}
		</Popover>
	)
}
