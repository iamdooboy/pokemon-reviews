import React, { useRef } from 'react'
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
	Heading,
	IconButton,
	Drawer,
	DrawerContent,
	DrawerOverlay
} from '@chakra-ui/react'
import Link from 'next/link'
import { FiMenu } from 'react-icons/fi'
import {
	MdCatchingPokemon,
	MdFavoriteBorder,
	MdOutlineSettings,
	MdLogout,
	MdOutlineRateReview
} from 'react-icons/md'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { useSession, signIn, signOut } from 'next-auth/react'
import LoginModal from './login-modal'
import { FallbackAvatar } from './fallback-image'
import { SearchIcon } from '@chakra-ui/icons'
import SearchModal from './search-modal'
import { useRouter } from 'next/router'
import { SidebarContent } from './sidebar-content'

const LoadingButton = (
	<Button isLoading colorScheme='gray' variant='solid'>
		Loading
	</Button>
)

const Navbar = () => {
	const router = useRouter()
	const { data: session, status } = useSession()
	const { isOpen, onOpen, onClose } = useDisclosure()
	const {
		isOpen: isOpenSearch,
		onOpen: onOpenSearch,
		onClose: onCloseSearch
	} = useDisclosure()
	const sidebar = useDisclosure()
	const user = session?.user
	const isLoadingUser = status === 'loading'
	const finalRef = useRef(null)
	const ref = useRef(null)
	const signOutHandler = () => {
		signOut({ redirect: false })
	}

	const CustomMenu = (
		<Menu isLazy>
			<MenuButton>
				<Flex align='center'>
					<FallbackAvatar
						width={45}
						height={45}
						name={user?.name}
						src={user?.image}
						fallback='/bug.svg'
					/>
					<Icon as={ChevronDownIcon} w={6} h={6} />
				</Flex>
			</MenuButton>
			<MenuList>
				<MenuItem>
					<VStack justify='start' alignItems='left'>
						<Text fontWeight='500'>{user?.name}</Text>
						<Text size='sm' color='gray.500' mt='0 !important'>
							{user?.email}
						</Text>
					</VStack>
				</MenuItem>

				<MenuDivider />
				<MenuItem icon={<MdOutlineRateReview fontSize={21} />}>
					<Text fontWeight='500'>My Reviews</Text>
				</MenuItem>
				<MenuItem icon={<MdFavoriteBorder fontSize={21} />}>
					<Text fontWeight='500'>Favorites</Text>
				</MenuItem>
				<MenuItem icon={<MdOutlineSettings fontSize={21} />}>
					<Text fontWeight='500'>Settings</Text>
				</MenuItem>
				<MenuDivider />
				<MenuItem onClick={signOutHandler} icon={<MdLogout fontSize={21} />}>
					<Text fontWeight='500'>Log out</Text>
				</MenuItem>
			</MenuList>
		</Menu>
	)

	return (
		<chakra.nav
			ref={ref}
			h='16'
			display='flex'
			alignItems='center'
			justifyContent='space-between'
			px='6'
			bg='#171923e6'
			css={{ backdropFilter: 'blur(10px)' }}
			sx={{
				'& > div': {
					flex: 1
				}
			}}
		>
			<Flex>
				<Link href='/' passHref>
					<Tag
						px={0}
						as='a'
						size='lg'
						variant='ghost'
						colorScheme='blue'
						display={{ base: 'none', md: 'flex' }}
					>
						<TagLeftIcon boxSize='30px' as={MdCatchingPokemon} />
						<TagLabel display={{ base: 'inline-flex' }}>
							Pokemon Reviews
						</TagLabel>
					</Tag>
				</Link>
				<IconButton
					onClick={sidebar.onOpen}
					aria-label='Menu'
					display={{ base: 'inline-flex', md: 'none' }}
					icon={<FiMenu />}
					size='md'
				/>
			</Flex>

			<Flex justify='right'>
				<chakra.button
					mr={3}
					type='button'
					display='flex'
					alignItems='center'
					color='gray.400'
					bg='gray.700'
					px='4'
					rounded='md'
					onClick={onOpenSearch}
				>
					<SearchIcon />
					<Text px={{ base: 2, sm: 4 }} textAlign='left' flex='1' noOfLines={1}>
						Search for a Pokemon
					</Text>
				</chakra.button>

				{isLoadingUser ? (
					LoadingButton
				) : user ? (
					CustomMenu
				) : (
					<Button colorScheme='blue' onClick={onOpen}>
						Log in
					</Button>
				)}
			</Flex>
			<SearchModal isOpen={isOpenSearch} onClose={onCloseSearch} />
			<LoginModal
				isOpen={isOpen}
				onClose={onClose}
				finalRef={finalRef}
				signIn={signIn}
			/>
			<Drawer
				isOpen={sidebar.isOpen}
				onClose={sidebar.onClose}
				placement='left'
			>
				<DrawerOverlay />
				<DrawerContent>
					<Flex
						px='5'
						py='5'
						align='center'
						bg='#171923e6'
						borderBottomWidth={1}
					>
						<Icon as={MdCatchingPokemon} w={8} h={8} />
						<Text fontSize='xl' ml='2' color='white' fontWeight='semibold'>
							Pokemon Reviews
						</Text>
					</Flex>
					<SidebarContent w='full' borderRight='none' />
				</DrawerContent>
			</Drawer>
		</chakra.nav>
	)
}

export default Navbar
