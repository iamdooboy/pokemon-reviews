import { Tabs, TabList, Tab, HStack, Heading } from '@chakra-ui/react'
import { useAppContext } from '../../context/state'
import { useFetchReviews } from '../../hooks/useFetchReviews'

const TABS = ['Latest', 'Popular']

const Sort = ({ pokemonName }) => {
	const { setSortOrder } = useAppContext()
	const fetcher = url =>
		axios
			.get(url, {
				params: {
					pokemon: pokemonName
				}
			})
			.then(res => res.data)

	const key = `/api/reviews/${pokemonName}`

	const { reviews } = useFetchReviews(key, fetcher)

	return (
		<>
			{reviews?.length > 0 && (
				<HStack align='center' justify='space-between' mt={3} maxW='xs'>
					<Heading as='h5' size='md'>
						{reviews?.length} Reviews
					</Heading>
					<Tabs
						variant='unstyled'
						onChange={index => {
							setSortOrder(index)
						}}
					>
						<TabList>
							{TABS.map(tab => (
								<Tab
									key={tab}
									id={tab}
									aria-controls={tab}
									_selected={{
										outline: '1px solid #3A404B',
										outlineOffset: 0,
										bg: 'rgba(17, 25, 40, 0.75)',
										rounded: 'md'
									}}
								>
									{tab}
								</Tab>
							))}
						</TabList>
					</Tabs>
				</HStack>
			)}
		</>
	)
}

export default Sort
