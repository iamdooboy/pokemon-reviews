import { useRef, useState } from 'react'
import {
	chakra,
	Flex,
	VStack,
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
	DrawerOverlay,
	HStack,
	Image,
	Heading
} from '@chakra-ui/react'
import {
	MdCatchingPokemon,
	MdFavoriteBorder,
	MdOutlineSettings,
	MdLogout,
	MdOutlineRateReview
} from 'react-icons/md'
import { FiMenu } from 'react-icons/fi'
import { ChevronDownIcon, SearchIcon } from '@chakra-ui/icons'
import { useSession, signIn, signOut } from 'next-auth/react'
import LoginModal from './login-modal'
import SearchModal from './search-modal'
import { SidebarContent } from '../sidebar/sidebar-content'
import { LinkOverlay } from '../link-overlay'
import { splitEmail } from '../../utils/helpers'
import { useRouter } from 'next/router'
import NextLink from 'next/link'

const LoadingButton = (
	<Button isLoading colorScheme='gray' variant='solid'>
		Loading
	</Button>
)

const Navbar = () => {
	const [login, setLogin] = useState(false)
	const { data: session, status } = useSession()
	const router = useRouter()
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

	const signOutHandler = () => {
		if (/settings|favorites|reviews/.test(router.asPath)) {
			signOut({ callbackUrl: '/' })
		} else if (/[1-9]$|\/$/.test(router.asPath)) {
			signOut({ redirect: false })
		} else {
			signOut({ redirect: true })
		}
	}

	const onClickHandler = e => {
		if (e.target.innerText === 'Log in') {
			setLogin(true)
		}
		onOpen()
	}

	const GEN = [
		{ title: 'Gen 1', href: '/gen/1' },
		{ title: 'Gen 2', href: '/gen/2' },
		{ title: 'Gen 3', href: '/gen/3' },
		{ title: 'Gen 4', href: '/gen/4' },
		{ title: 'Gen 5', href: '/gen/5' },
		{ title: 'Gen 6', href: '/gen/6' },
		{ title: 'Gen 7', href: '/gen/7' },
		{ title: 'Gen 8', href: '/gen/8' },
		{ title: 'Gen 9', href: '/gen/9' }
	]

	const ITEMS = [
		{
			icon: <MdOutlineRateReview fontSize={21} />,
			title: 'My Reviews',
			href: '/reviews'
		},
		{
			icon: <MdFavoriteBorder fontSize={21} />,
			title: 'Favorites',
			href: '/favorites'
		},
		{
			icon: <MdOutlineSettings fontSize={21} />,
			title: 'Settings',
			href: '/settings'
		}
	]

	const ref = useRef(null)

	return (
		<Flex
			as='nav'
			pos='fixed'
			w='full'
			ref={ref}
			h={16}
			alignItems='center'
			justifyContent='space-between'
			px={5}
			bg='#171923e6'
			sx={{
				'& > div': {
					flex: 1
				}
			}}
			css={{ backdropFilter: 'blur(10px)' }}
			borderBottomWidth={1}
			borderColor='whiteAlpha.100'
			zIndex={2}
		>
			<NextLink href='/'>
				<HStack display={{ base: 'none', md: 'flex' }} cursor='pointer'>
					<Image alt='dev logo' w={'auto'} h={10} src='/logo.png' />
					<Heading size='md'>Pokemon Reviews</Heading>
				</HStack>
			</NextLink>

			<Menu id='gen' isLazy initialFocusRef={ref}>
				<MenuButton
					as={Button}
					variant='ghost'
					size='sm'
					display={{ base: 'none', md: 'flex' }}
				>
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

			<Flex justify={{ base: 'left', md: 'right' }}>
				<Menu isLazy>
					<MenuButton
						display={{ base: 'inline-flex', md: 'none' }}
						as={IconButton}
						aria-label='Options'
						icon={<FiMenu />}
						variant='outline'
						mr={3}
					/>
					<MenuList>
						<MenuItem cursor='default' hover={{ bg: 'transparent' }}>
							<NextLink href='/'>
								<HStack cursor='pointer'>
									<Image alt='dev logo' w={'auto'} h={7} src='/logo.png' />
									<Heading size='xs'>Pokemon Reviews</Heading>
								</HStack>
							</NextLink>
						</MenuItem>
						<MenuDivider />
						{GEN.map(g => (
							<NextLink href={g.href} key={g.title}>
								<MenuItem>
									<Text fontWeight='500'>{g.title}</Text>
								</MenuItem>
							</NextLink>
						))}
					</MenuList>
				</Menu>
				<chakra.button
					w={{ base: 'full', md: '50%', lg: '32%' }}
					mr={3}
					type='button'
					display='flex'
					alignItems='center'
					color='whiteAlpha.400'
					bg='gray.700'
					px='4'
					rounded='md'
					onClick={onOpenSearch}
				>
					<SearchIcon color='white' />
					<Text px={{ base: 2, sm: 4 }} textAlign='left' flex='1' noOfLines={1}>
						Arceus, 493
					</Text>
				</chakra.button>

				{isLoadingUser ? (
					LoadingButton
				) : user ? (
					<Menu isLazy>
						<MenuButton>
							<Flex align='center'>
								<Image
									borderRadius='full'
									boxSize='36px'
									name={user.name}
									src={user.image}
									alt={user.name}
								/>
								<Icon
									as={ChevronDownIcon}
									w={6}
									h={6}
									mr={{ base: 5, md: 2, lg: 2 }}
								/>
							</Flex>
						</MenuButton>
						<MenuList>
							<MenuItem cursor='default' hover={{ bg: 'transparent' }}>
								<VStack justify='start' alignItems='left'>
									<Text fontWeight='500'>
										{user.name ? user.name : splitEmail(user.email)}
									</Text>
									<Text size='sm' color='gray.500' mt='0 !important'>
										{user.email}
									</Text>
								</VStack>
							</MenuItem>
							<MenuDivider />
							{ITEMS.map(item => (
								<LinkOverlay href={item.href} key={item.title}>
									<MenuItem _hover={{ bg: 'whiteAlpha.200' }} icon={item.icon}>
										<Text fontWeight='500'>{item.title}</Text>
									</MenuItem>
								</LinkOverlay>
							))}
							<MenuDivider />
							<MenuItem
								_hover={{ bg: 'whiteAlpha.200' }}
								onClick={signOutHandler}
								icon={<MdLogout fontSize={21} />}
							>
								<Text fontWeight='500'>Log out</Text>
							</MenuItem>
						</MenuList>
					</Menu>
				) : (
					<>
						<Button
							colorScheme='blue'
							onClick={onClickHandler}
							variant={{ base: 'solid', md: 'ghost' }}
							mr={{ base: 0, md: 3 }}
						>
							Log in
						</Button>
						<Button
							colorScheme='blue'
							onClick={onClickHandler}
							display={{ base: 'none', md: 'inline-flex' }}
						>
							Sign up
						</Button>
					</>
				)}
			</Flex>
			<SearchModal isOpen={isOpenSearch} onClose={onCloseSearch} />
			<LoginModal
				isOpen={isOpen}
				onClose={onClose}
				finalRef={finalRef}
				signIn={signIn}
				login={login}
				setLogin={setLogin}
			/>
			<Drawer
				isOpen={sidebar.isOpen}
				onClose={sidebar.onClose}
				placement='left'
			>
				<DrawerOverlay />
				<DrawerContent maxWidth='35%'>
					<LinkOverlay href='/'>
						<Flex
							px='4'
							py='5'
							align='center'
							bg='#171923e6'
							borderBottomWidth={1}
							gap={2}
						>
							<Icon as={MdCatchingPokemon} w={10} h={10} />
							<Text fontSize='xs' color='white' fontWeight='semibold'>
								Pokemon Reviews
							</Text>
						</Flex>
					</LinkOverlay>
					<SidebarContent w='full' borderRight='none' />
				</DrawerContent>
			</Drawer>
		</Flex>
	)
}

export default Navbar
