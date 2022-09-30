import { Flex, Icon } from '@chakra-ui/react'
import {
	RiNumber1,
	RiNumber2,
	RiNumber3,
	RiNumber4,
	RiNumber5,
	RiNumber6,
	RiNumber7,
	RiNumber8,
	RiNumber9
} from 'react-icons/ri'

export const SidebarContent = props => {
	const generations = [
		{ icon: RiNumber1, roman: 'I' },
		{ icon: RiNumber2, roman: 'II' },
		{ icon: RiNumber3, roman: 'III' },
		{ icon: RiNumber4, roman: 'IV' },
		{ icon: RiNumber5, roman: 'V' },
		{ icon: RiNumber6, roman: 'VI' },
		{ icon: RiNumber7, roman: 'VII' },
		{ icon: RiNumber8, roman: 'VIII' },
		{ icon: RiNumber9, roman: 'IX' }
	]
	return (
		<Flex flexDir='column' {...props} bg='#171923e6' h='full'>
			{generations.map(gen => (
				<NavItem icon={gen.icon}>Gen {gen.roman}</NavItem>
			))}
		</Flex>
	)
}

const NavItem = props => {
	const { icon, children, ...rest } = props
	return (
		<Flex
			align='center'
			px='4'
			mx='2'
			rounded='md'
			py='3'
			cursor='pointer'
			color='whiteAlpha.700'
			_hover={{
				bg: 'blackAlpha.300',
				color: 'whiteAlpha.900'
			}}
			role='group'
			fontWeight='semibold'
			transition='.15s ease'
			{...rest}
		>
			{icon && (
				<Icon
					mr='2'
					boxSize='4'
					_groupHover={{
						color: 'gray.300'
					}}
					as={icon}
				/>
			)}
			{children}
		</Flex>
	)
}
