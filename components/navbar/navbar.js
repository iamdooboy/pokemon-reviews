import React, { useRef, useState } from 'react'
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
	DrawerOverlay
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
import { FallBackImage } from '../../utils/fallback-image'
import { SidebarContent } from '../sidebar/sidebar-content'
import { LinkOverlay } from '../link-overlay'
import { splitEmail } from '../../utils/helpers'
import { useRouter } from 'next/router'

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
	const ref = useRef(null)

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

	return (
		<Box
			as='nav'
			pos='fixed'
			w='full'
			ref={ref}
			h={16}
			display='flex'
			alignItems='center'
			justifyContent='space-between'
			px={5}
			bg='#171923e6'
			sx={{
				'& > div': {
					flex: 1
				}
			}}
			borderBottomWidth={1}
			borderColor='whiteAlpha.100'
			zIndex={2}
		>
			<Flex display={{ base: 'none', md: 'inline' }}>
				<LinkOverlay href='/'>
					<Tag px={0} size='lg' variant='ghost' colorScheme='blue'>
						<TagLeftIcon boxSize='30px' as={MdCatchingPokemon} />
						<TagLabel display={{ base: 'inline-flex' }}>
							Pokemon Reviews
						</TagLabel>
					</Tag>
				</LinkOverlay>
			</Flex>

			<Flex justify={{ base: 'left', md: 'right' }}>
				<IconButton
					onClick={sidebar.onOpen}
					aria-label='Menu'
					display={{ base: 'inline-flex', md: 'none' }}
					icon={<FiMenu />}
					size='md'
					mr={3}
				/>
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
							<Flex align='center' pos='relative'>
								<FallBackImage
									borderRadius={9999}
									width={36}
									height={36}
									name={user.name}
									src={user.image}
									alt={user.name}
									fallback='/bug.svg'
									layout='fixed'
								/>

								<Icon as={ChevronDownIcon} w={6} h={6} mr={-1} />
							</Flex>
						</MenuButton>
						<MenuList>
							<MenuItem cursor='default'>
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
							<LinkOverlay href='/reviews'>
								<MenuItem icon={<MdOutlineRateReview fontSize={21} />}>
									<Text fontWeight='500'>My Reviews</Text>
								</MenuItem>
							</LinkOverlay>
							<LinkOverlay href='/favorites'>
								<MenuItem icon={<MdFavoriteBorder fontSize={21} />}>
									<Text fontWeight='500'>Favorites</Text>
								</MenuItem>
							</LinkOverlay>
							<LinkOverlay href='/settings'>
								<MenuItem icon={<MdOutlineSettings fontSize={21} />}>
									<Text fontWeight='500'>Settings</Text>
								</MenuItem>
							</LinkOverlay>
							<MenuDivider />
							<MenuItem
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
							variant='outline'
							mr={3}
						>
							Log in
						</Button>
						<Button colorScheme='blue' onClick={onClickHandler}>
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
		</Box>
	)
}

export default Navbar
