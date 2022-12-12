'use client'

import React from 'react'
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

// import {
//     chakra,
//     Box,
//     Flex,
//     useColorModeValue,
//     VisuallyHidden,
//     HStack,
//     Button,
//     useDisclosure,
//     VStack,
//     IconButton,
//     CloseButton,
//     Avatar,
// } from "@chakra-ui/react"
// import {
//     AiOutlineMenu,
//     AiFillHome,
//     AiOutlineInbox,
//     AiFillBell,
// } from "react-icons/ai"
// import { BsFillCameraVideoFill, BsPlus } from "react-icons/bs"

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
	//     return (
	//         <React.Fragment>
	//             <chakra.header
	//                 w="full"
	//                 px={{
	//                     base: 2,
	//                     sm: 4,
	//                 }}
	//                 py={4}
	//                 shadow="md"
	//             >
	//                 <Flex alignItems="center" justifyContent="space-between" mx="auto">
	//                     <HStack display="flex" spacing={3} alignItems="center">
	//                         <Box
	//                             display={{
	//                                 base: "inline-flex",
	//                                 md: "none",
	//                             }}
	//                         >
	//                             <IconButton
	//                                 display={{
	//                                     base: "flex",
	//                                     md: "none",
	//                                 }}
	//                                 aria-label="Open menu"
	//                                 fontSize="20px"
	//                                 color="gray.800"
	//                                 _dark={{
	//                                     color: "inherit",
	//                                 }}
	//                                 variant="ghost"
	//                                 icon={<AiOutlineMenu />}

	//                             />
	//                             <VStack
	//                                 pos="absolute"
	//                                 top={0}
	//                                 left={0}
	//                                 right={0}
	//                                 //display={mobileNav.isOpen ? "flex" : "none"}
	//                                 flexDirection="column"
	//                                 p={2}
	//                                 pb={4}
	//                                 m={2}
	//                                 //bg={bg}
	//                                 spacing={3}
	//                                 rounded="sm"
	//                                 shadow="sm"
	//                             >
	//                                 <CloseButton
	//                                     aria-label="Close menu"
	//                                     justifySelf="self-start"
	//                                 //onClick={mobileNav.onClose}
	//                                 />
	//                                 <Button w="full" variant="ghost" leftIcon={<AiFillHome />}>
	//                                     Dashboard
	//                                 </Button>
	//                                 <Button
	//                                     w="full"
	//                                     variant="solid"
	//                                     colorScheme="brand"
	//                                     leftIcon={<AiOutlineInbox />}
	//                                 >
	//                                     Inbox
	//                                 </Button>
	//                                 <Button
	//                                     w="full"
	//                                     variant="ghost"
	//                                     leftIcon={<BsFillCameraVideoFill />}
	//                                 >
	//                                     Videos
	//                                 </Button>
	//                             </VStack>
	//                         </Box>
	//                         <chakra.a
	//                             href="/"
	//                             title="Choc Home Page"
	//                             display="flex"
	//                             alignItems="center"
	//                         >
	//                             <MdCatchingPokemon />
	//                             <VisuallyHidden>Choc</VisuallyHidden>
	//                         </chakra.a>
	//                     </HStack>
	//                     <HStack
	//                         spacing={3}
	//                         //display={mobileNav.isOpen ? "none" : "flex"}
	//                         alignItems="center"
	//                     >
	//                         <Button colorScheme="red" leftIcon={<BsPlus />}>
	//                             New Wallet
	//                         </Button>

	//                         <chakra.a
	//                             p={3}
	//                             color="gray.800"
	//                             _dark={{
	//                                 color: "inherit",
	//                             }}
	//                             rounded="sm"
	//                             _hover={{
	//                                 color: "gray.800",
	//                                 _dark: {
	//                                     color: "gray.600",
	//                                 },
	//                             }}
	//                         >
	//                             <AiFillBell />
	//                             <VisuallyHidden>Notifications</VisuallyHidden>
	//                         </chakra.a>

	//                         <Avatar
	//                             size="sm"
	//                             name="Dan Abrahmov"
	//                             src="https://bit.ly/dan-abramov"
	//                         />
	//                     </HStack>
	//                 </Flex>
	//             </chakra.header>
	//         </React.Fragment>
	//     )

	return (
		<Flex
			as='nav'
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
			<Menu>
				<MenuButton as={Button} variant='ghost' size='sm'>
					<Flex align='center' pos='relative'>
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

				<Menu>
					<MenuButton>
						<Flex align='center' pos='relative'>
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
