import { HStack, Heading } from '@chakra-ui/react'
import { useFetchReviews } from '../../hooks/useFetchReviews'
import SortButtons from '../sort-buttons'

const SortSection = ({ reviews, setSortOrder }) => {
	return (
		<>
			<HStack align='center' justify='space-between' maxW='sm' h={12} mb={3}>
				<Heading as='h5' size='sm'>
					{reviews.length} Reviews
				</Heading>
				<SortButtons setSortOrder={setSortOrder} />
			</HStack>
		</>
	)
}

export default SortSection
