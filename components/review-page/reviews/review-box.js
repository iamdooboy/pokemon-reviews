import React, { useState } from 'react'
import { Box, Flex, Avatar, Text, HStack, Spacer } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'

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

const CommentBox = ({ review }) => {
	const { description, rating, author } = review

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
					<HStack mt={-2} justify>
						<Text color='gray.500'>{author?.name}</Text>
						<Spacer />
						<Flex>
							{Array.from(Array(5).keys()).map((id, index) => {
								index += 1
								return (
									<StarIcon
										boxSize={3}
										key={id}
										mr={2}
										color={index <= rating ? 'gold' : 'gray'}
									/>
								)
							})}
						</Flex>
					</HStack>
					<ReadMore>{description}</ReadMore>
				</Box>
			</Flex>
		</Box>
	)
}

export default CommentBox