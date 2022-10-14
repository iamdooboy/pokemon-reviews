import { useState } from 'react'
import { useRouter } from 'next/router'
import { Flex, Icon } from '@chakra-ui/react'
import { LinkOverlay } from '../../components/link-overlay'

export const SidebarContent = () => {
	const router = useRouter()
	const [activeGen, setActiveGen] = useState(parseInt(router.query.id))

	return (
		<Flex flexDir='column' pt={6} bg='#171923e6' h='full'>
			{[...Array(8)].map((_, index) => (
				<LinkOverlay key={index} href={`/gen/${index + 1}/`} my={3}>
					<NavItem
						active={activeGen === index + 1}
						onClick={() => setActiveGen(index + 1)}
					>
						Gen {index + 1}
					</NavItem>
				</LinkOverlay>
			))}
		</Flex>
	)
}

const NavItem = props => {
	const { active, icon, children, ...rest } = props
	return (
		<Flex
			pl={{ base: 6, md: 0 }}
			align='center'
			justify={{ base: 'left', md: 'center' }}
			py={3}
			cursor='pointer'
			bg={active && 'rgba(48, 140, 122, 0.3)'}
			color={active ? 'white' : 'whiteAlpha.500'}
			_hover={{
				color: 'white'
			}}
			role='group'
			fontWeight='semibold'
			transition='.15s ease'
			fontSize={12}
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
