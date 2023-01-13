import { chakra, Flex, Text, useDisclosure } from '@chakra-ui/react'
import { FaThumbsUp, FaRegThumbsUp } from 'react-icons/fa'
import { StarIcon } from '@chakra-ui/icons'
import { useSession } from 'next-auth/react'
import ErrorModal from './error-modal'

const AddOn = ({ like, review, count, average, duplicate }) => {
	const session = useSession()
	const error = {
		title: 'Authorization Error',
		message: 'Please sign up or log in to like this comment.'
	}
	const { favorite, rating, favoritedByCurrentUser } = review

	const errorModal = useDisclosure()
	const favoriteIcon = favoritedByCurrentUser ? (
		<FaThumbsUp color='#38B2AC' />
	) : (
		<FaRegThumbsUp />
	)

	const likeHandler = () => {
		if (!session.data) {
			errorModal.onOpen()
			return
		}
		like({ review, count, average, duplicate })
	}

	return (
		<>
			<Flex align='center' justify='space-between' mt={2}>
				<Flex>
					{Array.from(Array(5).keys()).map((id, index) => {
						index += 1
						return (
							<StarIcon
								boxSize={3}
								key={id}
								mr={2}
								color={index <= rating ? '#f59e0b' : 'gray'}
							/>
						)
					})}
				</Flex>
				<Flex gap={1}>
					<chakra.button
						cursor={session.data ? 'pointer' : 'not-allowed'}
						onClick={likeHandler}
					>
						{favoriteIcon}
					</chakra.button>
					<Text fontSize='sm'>{favorite}</Text>
				</Flex>
			</Flex>
			<ErrorModal errorModal={errorModal} error={error} />
		</>
	)
}

export default AddOn
