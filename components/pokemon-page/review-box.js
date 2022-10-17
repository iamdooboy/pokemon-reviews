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
import ReadMore from '../read-more'

const ReviewBox = ({ user, review, onEdit, onDelete }) => {
	const { id, description, rating, author, favorite, favoritedByCurrentUser } =
		review

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
												onClick={() => onEdit(review)}
												leftIcon={<EditIcon />}
												variant='ghost'
												w='full'
												rounded='none'
												justifyContent='start'
											>
												Edit
											</Button>
											<Button
												onClick={() => onDelete(id)}
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
					<ReadMore noOfLines={4}>{description}</ReadMore>
					<AddOn
						id={id}
						rating={rating}
						favorite={favorite}
						didUserFavoriteReview={favoritedByCurrentUser}
					/>
				</Box>
			</Flex>
		</Box>
	)
}

export default ReviewBox
