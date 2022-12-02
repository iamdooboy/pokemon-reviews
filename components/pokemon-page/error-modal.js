import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalCloseButton,
	Alert,
	AlertIcon,
	AlertTitle,
	AlertDescription
} from '@chakra-ui/react'

const ErrorModal = ({ errorModal, error }) => {
	const { isOpen, onClose } = errorModal
	return (
		<Modal isCentered isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<Alert
					status='error'
					variant='subtle'
					flexDirection='column'
					alignItems='center'
					justifyContent='center'
					textAlign='center'
					height='200px'
				>
					<ModalCloseButton />
					<AlertIcon boxSize='40px' mr={0} />
					<AlertTitle mt={4} mb={1} fontSize='lg'>
						{error.title}
					</AlertTitle>
					<AlertDescription maxWidth='sm'>{error.message}</AlertDescription>
				</Alert>
			</ModalContent>
		</Modal>
	)
}

export default ErrorModal
