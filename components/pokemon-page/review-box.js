import React from 'react'
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
import useSWR from 'swr'
import axios from 'axios'
import { useMutation } from '../../hooks/useMutation'
import { EllipsisButton } from '../ellipsis-button'

const ReviewBox = ({ review, setSelected, onOpen, reviews, pokemonName }) => {
	const { data: user } = useSWR('/api/user')

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
				<Avatar size='xs' name={author.name} src={author.image} />
				<Box align='left' pl={3} w='full'>
					<Flex mt={-2}>
						<Text color='gray.500'>{author.name}</Text>
						<Spacer />
						{user.id === author.id && (
							<EllipsisButton
								setSelected={setSelected}
								review={review}
								onOpen={onOpen}
								reviews={reviews}
								pokemonName={pokemonName}
							/>
						)}
					</Flex>
					<ReadMore noOfLines={4}>{description}</ReadMore>
					<AddOn pokemonName={pokemonName} review={review} />
				</Box>
			</Flex>
		</Box>
	)
}

export default ReviewBox
