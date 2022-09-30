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
	HStack
} from '@chakra-ui/react'
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

const LoadingButton = (
	<Button isLoading colorScheme='gray' variant='solid'>
		Loading
	</Button>
)

const Navbar = () => {
	const { data: session, status } = useSession()
	const { isOpen, onOpen, onClose } = useDisclosure()
	const {
		isOpen: isOpenSearch,
		onOpen: onOpenSearch,
		onClose: onCloseSearch
	} = useDisclosure()
	const user = session?.user
	const isLoadingUser = status === 'loading'
	const finalRef = useRef(null)

	const signOutHandler = () => {
		signOut({ redirect: false })
	}

	const CustomMenu = (
		<Menu isLazy>
			<MenuButton>
				<Flex align='center'>
					<FallbackAvatar
						width={52}
						height={52}
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
		<>
			<chakra.header
				position='fixed'
				w='full'
				px={{ base: 2, sm: 4 }}
				py={4}
				shadow='md'
				bg='#171923e6'
				css={{ backdropFilter: 'blur(10px)' }}
				zIndex={2}
			>
				<Flex alignItems='center' justifyContent='space-between' mx='auto'>
					<Tag size='lg' variant='ghost' colorScheme='blue'>
						<TagLeftIcon boxSize='30px' as={MdCatchingPokemon} />
						<TagLabel display={{ base: 'inline-flex' }}>
							Pokemon Reviews
						</TagLabel>
					</Tag>

					<Flex>
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
							<Text ml={3} textAlign='left' flex='1'>
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
				</Flex>
			</chakra.header>
			<SearchModal isOpen={isOpenSearch} onClose={onCloseSearch} />
			<LoginModal
				isOpen={isOpen}
				onClose={onClose}
				finalRef={finalRef}
				signIn={signIn}
			/>
		</>
	)
}

export default Navbar
