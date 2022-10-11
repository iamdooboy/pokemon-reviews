import NextLink from 'next/link'
import { Box, Icon, Flex, Spacer, Stack, Link } from '@chakra-ui/react'
import { BsArrowReturnLeft } from 'react-icons/bs'
import { CgPokemon } from 'react-icons/cg'

const CustomInputResults = ({ pokemon, onClose, index, activeIndex, gen }) => {
	const bgColor = index === activeIndex ? 'blue.600' : 'gray.600'

	return (
		<NextLink href={`/gen/${gen}/${pokemon}`} passHref>
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
					gap={5}
					_hover={{
						bg: 'blue.600'
					}}
				>
					<Icon as={CgPokemon} boxSize={5} my='auto' />
					<Stack dir='row' spacing={0}>
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

export default CustomInputResults
