import { useState } from 'react'
import { Text } from '@chakra-ui/react'

const ReadMore = ({ noOfLines, children }) => {
	const [isReadMore, setIsReadMore] = useState(children.length > 156)

	return (
		<>
			<Text fontSize='sm' noOfLines={isReadMore ? noOfLines : ''}>
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

export default ReadMore
