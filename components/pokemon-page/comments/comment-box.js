import React from 'react'
import { Box, Flex, Avatar, Text, HStack, Spacer } from '@chakra-ui/react'

const Star = ({ fillColor }) => {
	return (
		<svg
			style={{
				width: '.75rem',
				height: '.75rem',
				fill: fillColor,
				marginRight: '0.25rem'
			}}
			viewBox='0 0 1000 1000'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path d='M972 380c9 28 2 50-20 67L725 619l87 280c11 39-18 75-54 75-12 0-23-4-33-12L499 790 273 962a58 58 0 0 1-78-12 50 50 0 0 1-8-51l86-278L46 447c-21-17-28-39-19-67 8-24 29-40 52-40h280l87-279c7-23 28-39 52-39 25 0 47 17 54 41l87 277h280c24 0 45 16 53 40z' />
		</svg>
	)
}

const CommentBox = () => {
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
			<Flex justifyItems='left' align='left'>
				<Avatar
					size='xs'
					name='Dan Abrahmov'
					src='https://bit.ly/dan-abramov'
				/>
				<Box align='left' pl={3}>
					<HStack mt={-2}>
						<Text color='gray.500'>Dan Abrahmov</Text>
						<Spacer />
						<Flex justifyContent='right'>
							{Array.from(Array(4).keys()).map(id => {
								return <Star key={id} fillColor='#FBBC05' />
							})}
							{Array.from(Array(5 - 4).keys()).map(id => {
								return <Star key={id} fillColor='#E8EAEE' />
							})}
						</Flex>
					</HStack>

					<Text fontSize='sm' noOfLines={4}>
						Lorem Ipsum is simply dummy text of the printing and typesetting
						industry. Lorem Ipsum has been the industry's standard dummy text
						ever since the 1500s, when an unknown printer took a galley of type
						and scrambled it to make a type specimen book.
					</Text>
				</Box>
			</Flex>
		</Box>
	)
}

export default CommentBox
