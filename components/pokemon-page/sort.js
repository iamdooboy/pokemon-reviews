import { HStack, Button, Heading, ButtonGroup } from '@chakra-ui/react'
import { useRef } from 'react'
const Sort = () => {
	return (
		<HStack align='center' justify='space-between' mt={3} maxW='xs'>
			<Heading as='h5' size='md'>
				53 Reviews
			</Heading>
			<ButtonGroup variant='ghost' spacing={1}>
				<Button
					autoFocus
					_hover={{ bg: 'transparent' }}
					_focus={{
						outline: '1px solid #3A404B',
						outlineOffset: 0,
						bg: 'rgba(17, 25, 40, 0.75)'
					}}
				>
					Latest
				</Button>
				<Button
					_hover={{ bg: 'transparent' }}
					_focus={{
						outline: '1px solid #3A404B',
						outlineOffset: 0,
						bg: 'rgba(17, 25, 40, 0.75)'
					}}
					variant='ghost'
				>
					Top
				</Button>
			</ButtonGroup>
		</HStack>
	)
}

export default Sort
