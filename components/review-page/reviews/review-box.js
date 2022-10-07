import React, { useState } from 'react'
import {
	Box,
	Flex,
	Avatar,
	Text,
	Spacer,
	Icon,
	Button,
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverBody,
	PopoverArrow
} from '@chakra-ui/react'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import AddOn from './add-on'
import { AiOutlineEllipsis } from 'react-icons/ai'
import axios from 'axios'

const ReadMore = ({ children }) => {
	const [isReadMore, setIsReadMore] = useState(children.length > 156)

	return (
		<>
			<Text fontSize='sm' noOfLines={isReadMore ? 4 : ''}>
				{children}
			</Text>
			<Text
				cursor='pointer'
				color='whiteAlpha.500'
				onClick={() => setIsReadMore(!isReadMore)}
			>
				{isReadMore ? 'read more' : ''}
			</Text>
		</>
	)
}

const ReviewBox = ({ user, review, setAllReviews, onOpen, setEditReview }) => {
	const { id, description, rating, author } = review

	const editClickHander = () => {
		setEditReview(review)
		onOpen()
	}

	const deleteClickHander = async () => {
		const res = await axios.delete('/api/reviews', { data: { id } })
		console.log(res.data.message)
		setAllReviews(prev => {
			return prev.filter(el => el.id !== id)
		})
	}

	return (
		<Box
			maxW='xs'
			rounded={8}
			borderWidth={1}
			align='center'
			mt={3}
			mx='auto'
			p={3}
			bg='rgba(17, 25, 40, 0.75)'
		>
			<Flex>
				<Avatar size='xs' name={author?.name} src={author?.image} />
				<Box align='left' pl={3} w='full'>
					<Flex mt={-2}>
						<Text color='gray.500'>{author?.name}</Text>
						<Spacer />
						{user.id === author.id && (
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
												onClick={editClickHander}
												leftIcon={<EditIcon />}
												variant='ghost'
												w='full'
												rounded='none'
												justifyContent='start'
											>
												Edit
											</Button>
											<Button
												onClick={deleteClickHander}
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
						)}
					</Flex>
					<ReadMore>{description}</ReadMore>
					<AddOn rating={rating} />
				</Box>
			</Flex>
		</Box>
	)
}

export default ReviewBox
