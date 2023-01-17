import { Box, Icon, Flex, Spacer, Stack, Text } from '@chakra-ui/react'
import { BsArrowReturnLeft } from 'react-icons/bs'
import { formatNames, capitalFirstLetter } from '../utils/helpers'
import { LinkOverlay } from '../components/link-overlay'

const CustomInputResults = ({ id, gen, pokemon, onClose, bgColor }) => {
	let formattedName = formatNames(pokemon)
	formattedName = capitalFirstLetter(formattedName)

	let paddedId = id?.toString().padStart(4, '0')
	return (
		<LinkOverlay href={`/gen/${gen}/${pokemon}`}>
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
				<Text color='gray.400' my='auto'>
					{paddedId}
				</Text>
				<Stack dir='row' spacing={0}>
					<Box fontWeight='bold'>{formattedName}</Box>
				</Stack>
				<Spacer />
				<Icon my='auto' boxSize={5} as={BsArrowReturnLeft} />
			</Flex>
		</LinkOverlay>
	)
}

export default CustomInputResults
