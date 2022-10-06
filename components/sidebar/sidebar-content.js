import { useState, useEffect } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { Flex, Icon, Link } from '@chakra-ui/react'

export const SidebarContent = props => {
	const router = useRouter()

	const [activeGen, setActiveGen] = useState(1)

	useEffect(() => {
		const id = parseInt(router.query.id)
		setActiveGen(id)
	}, [router])

	return (
		<Flex flexDir='column' {...props} bg='#171923e6' h='full'>
			{[...Array(8)].map((e, index) => (
				<LinkOverlay key={index} href={`/gen/${index + 1}/`}>
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

const LinkOverlay = ({ href, children }) => {
	return (
		<NextLink href={href} passHref>
			<Link _hover={{ textDecoration: 'none' }} my={3}>
				{children}
			</Link>
		</NextLink>
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
