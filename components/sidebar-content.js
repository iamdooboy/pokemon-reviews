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
import { useRouter } from 'next/router'

export const SidebarContent = props => {
	const router = useRouter()
	const generations = [
		{ icon: RiNumber1, roman: 'I', numberOfPokemon: 151, offset: 0 },
		{ icon: RiNumber2, roman: 'II', numberOfPokemon: 100, offset: 151 },
		{ icon: RiNumber3, roman: 'III', numberOfPokemon: 135, offset: 251 },
		{ icon: RiNumber4, roman: 'IV', numberOfPokemon: 107, offset: 386 },
		{ icon: RiNumber5, roman: 'V', numberOfPokemon: 156, offset: 493 },
		{ icon: RiNumber6, roman: 'VI', numberOfPokemon: 72, offset: 649 },
		{ icon: RiNumber7, roman: 'VII', numberOfPokemon: 88, offset: 721 },
		{ icon: RiNumber8, roman: 'VIII', numberOfPokemon: 96, offset: 809 }
		// { icon: RiNumber9, roman: 'IX', numberOfPokemon: 151 }
	]
	return (
		<Flex flexDir='column' {...props} bg='#171923e6' h='full'>
			{generations.map((gen, index) => (
				<NavItem
					key={index}
					onClick={() =>
						router.push(
							{
								pathname: '/',
								query: {
									numberOfPokemon: gen.numberOfPokemon,
									offset: gen.offset
								}
							},
							'/'
						)
					}
					icon={gen.icon}
				>
					Gen {gen.roman}
				</NavItem>
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
