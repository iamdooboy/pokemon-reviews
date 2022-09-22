import React, { useState } from 'react'
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
	const logoutHandler = async () => {}

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
						<InputGroup>
							<InputLeftElement pointerEvents='none'>
								<AiOutlineSearch />
							</InputLeftElement>
							<Input variant='filled' placeholder='Search...' />
						</InputGroup>
						<Menu isLazy>
							<MenuButton>
								<Flex align='center'>
									<Avatar
										ml={2}
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
									<Text fontWeight='500'>Log out</Text>
								</MenuItem>
							</MenuList>
						</Menu>
					</Flex>
				</Flex>
			</chakra.header>
		</>
	)
}

export default Navbar
