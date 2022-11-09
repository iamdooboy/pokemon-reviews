import React from 'react'
import { Box, Flex, Avatar, Text, Spacer } from '@chakra-ui/react'
import AddOn from './add-on'
import ReadMore from '../read-more'
import useSWR from 'swr'
import { EllipsisButton } from '../ellipsis-button'

const ReviewBox = ({ review, setSelected, onOpen, pokemonName }) => {
	const { data: user } = useSWR('/api/user')

	const { description, author } = review

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
								{...{ setSelected, review, onOpen, pokemonName }}
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
