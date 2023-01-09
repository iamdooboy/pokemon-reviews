import { Box, Flex, Avatar, Text, Spacer } from '@chakra-ui/react'
import AddOn from './add-on'
import ReadMore from '../read-more'
import { EllipsisButton } from '../ellipsis-button'

const ReviewBox = props => {
	const { authz, description, author } = props.review
	return (
		<Box
			maxW='sm'
			rounded={8}
			borderWidth={1}
			align='center'
			mx='auto'
			p={3}
			bg='rgba(17, 25, 40, 0.75)'
			w='full'
		>
			<Flex>
				<Avatar size='xs' name={author.name} src={author.image} />
				<Box align='left' pl={3} w='full'>
					<Flex mt={-2}>
						<Text color='gray.500'>{author.name}</Text>
						<Spacer />
						{authz && <EllipsisButton {...props} />}
					</Flex>
					<ReadMore noOfLines={4}>{description}</ReadMore>
					<AddOn {...props} />
				</Box>
			</Flex>
		</Box>
	)
}

export default ReviewBox
