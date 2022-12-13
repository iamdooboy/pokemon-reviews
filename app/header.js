'use client'

import { useRef } from 'react'
import NextLink from 'next/link'
import {
	chakra,
	Flex,
	VStack,
	Tag,
	TagLabel,
	TagLeftIcon,
	Icon,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	MenuDivider,
	Text,
	useDisclosure,
	Button,
	IconButton,
	Drawer,
	DrawerContent,
	Box,
	DrawerOverlay,
	Image,
	Heading,
	HStack,
	Link
} from '@chakra-ui/react'
import { FiMenu } from 'react-icons/fi'
import { ChevronDownIcon, SearchIcon } from '@chakra-ui/icons'
import { LinkOverlay } from '../components/link-overlay'
import {
	MdCatchingPokemon,
	MdFavoriteBorder,
	MdOutlineSettings,
	MdLogout,
	MdOutlineRateReview
} from 'react-icons/md'

const Header = () => {
	const GEN = [
		{ title: 'Gen 1', href: '/gen/1' },
		{ title: 'Gen 2', href: '/gen/2' },
		{ title: 'Gen 3', href: '/gen/3' },
		{ title: 'Gen 4', href: '/gen/4' },
		{ title: 'Gen 5', href: '/gen/5' },
		{ title: 'Gen 6', href: '/gen/6' },
		{ title: 'Gen 7', href: '/gen/7' },
		{ title: 'Gen 8', href: '/gen/8' }
	]

	const ref = useRef(null)
	return (
		<Flex
			as='nav'
			top={0}
			w='full'
			h={16}
			alignItems='center'
			justifyContent='space-between'
			bg='#171923e6'
			sx={{
				'& > div': {
					flex: 1
				}
			}}
			borderBottomWidth={1}
			borderColor='whiteAlpha.100'
		>
			<HStack px={4}>
				<Image alt='dev logo' w={'auto'} h={10} src='/logo.png' />
				<Heading size='md'>Pokemon Reviews</Heading>
			</HStack>
			<Menu id='gen' isLazy initialFocusRef={ref}>
				<MenuButton as={Button} variant='ghost' size='sm'>
					<Flex align='center'>
						Generations
						<Icon as={ChevronDownIcon} w={6} h={6} mr={-1} />
					</Flex>
				</MenuButton>
				<MenuList>
					{GEN.map(g => (
						<NextLink href={g.href} key={g.title}>
							<MenuItem>
								<Text fontWeight='500'>{g.title}</Text>
							</MenuItem>
						</NextLink>
					))}
				</MenuList>
			</Menu>

			<Flex
				justify={{ base: 'space-between', md: 'right' }}
				gap={2}
				px={{ base: 2, md: 4 }}
			>
				<IconButton
					display={{ base: 'inline-flex', md: 'none' }}
					icon={<MdCatchingPokemon w='3em' h='3em' />}
					size='md'
				/>
				<Button
					_hover={{ bg: 'gray.700' }}
					w={{ base: 'full', md: '15rem' }}
					justifyContent='left'
					color='whiteAlpha.400'
					bg='gray.700'
					leftIcon={<SearchIcon color='white' mr={1} />}
					size='sm'
				>
					Arceus, 493
				</Button>
				<IconButton
					aria-label='Menu'
					display={{ base: 'inline-flex', md: 'none' }}
					icon={<FiMenu />}
					size='md'
				/>
				<Flex display={{ base: 'none', md: 'flex' }} gap={2}>
					<Button colorScheme='blue' variant='ghost' size='sm'>
						Log in
					</Button>
					<Button colorScheme='blue' size='sm'>
						Sign up
					</Button>
				</Flex>

				<Menu id='profile' isLazy>
					<MenuButton>
						<Flex align='center'>
							<Icon as={ChevronDownIcon} w={6} h={6} mr={-1} />
						</Flex>
					</MenuButton>
					<MenuList>
						<MenuItem>
							<VStack justify='start' alignItems='left'>
								<Text fontWeight='500'>dfdfd</Text>
								<Text size='sm' color='gray.500' mt='0 !important'>
									sdfsdf
								</Text>
							</VStack>
						</MenuItem>
						<MenuDivider />
						<Link href='/reviews'>
							<MenuItem icon={<MdOutlineRateReview fontSize={21} />}>
								<Text fontWeight='500'>My Reviews</Text>
							</MenuItem>
						</Link>
						<Link href='/favorites'>
							<MenuItem icon={<MdFavoriteBorder fontSize={21} />}>
								<Text fontWeight='500'>Favorites</Text>
							</MenuItem>
						</Link>
						<Link href='/settings'>
							<MenuItem icon={<MdOutlineSettings fontSize={21} />}>
								<Text fontWeight='500'>Settings</Text>
							</MenuItem>
						</Link>
						<MenuDivider />
						<MenuItem icon={<MdLogout fontSize={21} />}>
							<Text fontWeight='500'>Log out</Text>
						</MenuItem>
					</MenuList>
				</Menu>
			</Flex>
		</Flex>
	)
}

export default Header
