import React, { useState } from 'react'
import NavLink from 'next/link'
import { useRouter } from 'next/router'
import { supabaseClient } from '../lib/client'
import {
	chakra,
	Flex,
	HStack,
	VStack,
	InputGroup,
	InputLeftElement,
	Input,
	Avatar,
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
	Spinner
} from '@chakra-ui/react'
import {
	MdCatchingPokemon,
	MdFavoriteBorder,
	MdOutlineSettings,
	MdLogout,
	MdOutlineRateReview
} from 'react-icons/md'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { AiOutlineSearch } from 'react-icons/ai'

const Navbar = () => {
	const router = useRouter()
	const [isLogoutLoading, setIsLogoutLoading] = useState(false)

	const logoutHandler = async () => {
		try {
			setIsLogoutLoading(true)
			await supabaseClient.auth.signOut()
			router.push('/login')
		} catch (error) {
			router.push('/login')
		} finally {
			setIsLogoutLoading(false)
		}
	}

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

					<HStack spacing={3}>
						<InputGroup>
							<InputLeftElement pointerEvents='none'>
								<AiOutlineSearch />
							</InputLeftElement>
							<Input variant='filled' placeholder='Search...' />
						</InputGroup>
						<Menu isLazy>
							<MenuButton size='sm' px={0} py={0} rounded='full'>
								<Flex align='center'>
									<Avatar
										size='sm'
										name='Dan Abrahmov'
										src='https://bit.ly/dan-abramov'
									/>
									<Icon as={ChevronDownIcon} w={6} h={6} />
								</Flex>
							</MenuButton>
							<MenuList>
								<MenuItem>
									<VStack justify='start' alignItems='left'>
										<Text fontWeight='500'>Dan Abrahmov</Text>
										<Text size='sm' color='gray.500' mt='0 !important'>
											danabrahmov@gmail.com
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
								<MenuItem
									onClick={logoutHandler}
									icon={<MdLogout fontSize={21} />}
								>
									<Text fontWeight='500'>
										{isLogoutLoading ? <Spinner /> : 'Log out'}
									</Text>
								</MenuItem>
							</MenuList>
						</Menu>
					</HStack>
				</Flex>
			</chakra.header>
		</>
	)
}

export default Navbar
