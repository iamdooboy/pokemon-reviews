import { HStack, Heading } from '@chakra-ui/react'
import { useFetchReviews } from '../../hooks/useFetchReviews'
import SortButtons from '../sort-buttons'

const SortSection = ({ swrData, setSortOrder }) => {
	const { key, fetcher } = swrData
	const { reviews } = useFetchReviews(key, fetcher)
	return (
		<>
			{reviews?.length > 0 && (
				<HStack align='center' justify='space-between' mt={3} maxW='xs'>
					<Heading as='h5' size='md'>
						{reviews?.length} Reviews
					</Heading>
					<SortButtons setSortOrder={setSortOrder} />
				</HStack>
			)}
		</>
	)
}

export default SortSection
