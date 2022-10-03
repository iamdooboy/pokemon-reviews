import { Flex, Icon, Link } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useState } from 'react'
import {
	RiNumber1,
	RiNumber2,
	RiNumber3,
	RiNumber4,
	RiNumber5,
	RiNumber6,
	RiNumber7,
	RiNumber8
} from 'react-icons/ri'
import { useRouter } from 'next/router'

export const SidebarContent = props => {
	const router = useRouter()
	const id = parseInt(router.query.id)

	const [activeGen, setActiveGen] = useState(id)

	const generations = [
		{ icon: RiNumber1, num: 1 },
		{ icon: RiNumber2, num: 2 },
		{ icon: RiNumber3, num: 3 },
		{ icon: RiNumber4, num: 4 },
		{ icon: RiNumber5, num: 5 },
		{ icon: RiNumber6, num: 6 },
		{ icon: RiNumber7, num: 7 },
		{ icon: RiNumber8, num: 8 }
	]

	return (
		<Flex flexDir='column' {...props} bg='#171923e6' h='full'>
			{generations.map((gen, index) => (
				<LinkOverlay key={index} href={`/gen/${gen.num}/`}>
					<NavItem
						icon={gen.icon}
						active={activeGen === gen.num}
						onClick={() => setActiveGen(gen.num)}
					>
						Gen {gen.num}
					</NavItem>
				</LinkOverlay>
			))}
		</Flex>
	)
}

const LinkOverlay = ({ href, children }) => {
	return (
		<NextLink href={href} passHref>
			<Link _hover={{ textDecoration: 'none' }}>{children}</Link>
		</NextLink>
	)
}

const NavItem = props => {
	const { active, icon, children, ...rest } = props
	return (
		<Flex
			align='center'
			px='4'
			mx='2'
			rounded='md'
			py='3'
			cursor='pointer'
			bg={active && 'gray.700'}
			color='whiteAlpha.700'
			_hover={{
				color: 'gray.400',
				bg: 'gray.700'
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
