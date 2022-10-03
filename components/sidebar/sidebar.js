import {
	IconButton,
	chakra,
	useDisclosure,
	Tooltip,
	useBoolean
} from '@chakra-ui/react'
import { SidebarContent } from './sidebar-content'
import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons'

const Sidebar = () => {
	const { isOpen, onClose, onOpen } = useDisclosure({ defaultIsOpen: true })
	const [flag, setFlag] = useBoolean()

	const onClickHandler = e => {
		if (!isOpen) {
			onOpen()
		}
	}

	return (
		<chakra.div
			h='calc((100vh - var(--chakra-sizes-16)))'
			overflowY='auto'
			display={{ base: 'none', md: 'unset' }}
			borderRightWidth={1}
			borderColor='whiteAlpha.100'
		>
			<chakra.aside
				role='group'
				transition={`width .2s ease, opacity .${isOpen ? 3 : 1}s ease`}
				sx={{
					overscrollBehavior: 'contain'
				}}
				overflowY='auto'
				h='full'
				w={isOpen ? '75px' : '24px'}
				pos='relative'
				bg={isOpen ? 'layout.card' : '#171923e6'}
				_hover={{ cursor: !isOpen && 'pointer' }}
				onClick={onClickHandler}
			>
				<Tooltip
					placement='right'
					label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
					bg='whiteAlpha.300'
					color='whiteAlpha.700'
				>
					<IconButton
						aria-label='Close sidebar'
						icon={isOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
						size='xs'
						pos='absolute'
						top='0'
						right='0'
						opacity={isOpen ? '0' : '1'}
						_groupHover={{
							opacity: '1'
						}}
						onClick={isOpen ? onClose : onOpen}
						rounded='none'
						roundedBottomLeft={isOpen ? 'md' : 'none'}
						bg={isOpen ? 'whiteAlpha.200' : '#171923e6'}
					/>
				</Tooltip>

				{isOpen && <SidebarContent pt={6} />}
			</chakra.aside>
		</chakra.div>
	)
}

export default Sidebar
