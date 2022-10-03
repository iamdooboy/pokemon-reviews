import React from 'react'
import { Box, Icon, Flex, Spacer, Stack, Link } from '@chakra-ui/react'
import { BsArrowReturnLeft } from 'react-icons/bs'
import NextLink from 'next/link'
import { CgPokemon } from 'react-icons/cg'

const SearchResultList = ({ pokemon, onClose, index, activeIndex }) => {
	const bgColor = index === activeIndex ? 'blue.600' : 'gray.600'

	return (
		<NextLink href={`/${pokemon}`} passHref>
			<Link>
				<Flex
					my={2}
					px={4}
					py={3}
					rounded='lg'
					cursor='pointer'
					transition='all 0.3s ease-in-out'
					onClick={onClose}
					bg={bgColor}
					_hover={{
						bg: 'blue.600'
					}}
				>
					<Icon as={CgPokemon} boxSize={5} my='auto' />
					<Stack dir='row' spacing={0} ml={5}>
						<Box fontWeight='bold' textTransform='capitalize'>
							{pokemon}
						</Box>
					</Stack>
					<Spacer />
					<Icon my='auto' boxSize={5} as={BsArrowReturnLeft} />
				</Flex>
			</Link>
		</NextLink>
	)
}

export default SearchResultList
