import { Tabs, TabList, Tab } from '@chakra-ui/react'

const SortButtons = ({ setSortOrder }) => {
	const TABS = ['Latest', 'Popular']
	return (
		<Tabs
			py={4}
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
	)
}

export default SortButtons
