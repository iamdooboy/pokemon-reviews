import React, { useState } from 'react'
import Image from 'next/image'
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalCloseButton,
	Button,
	Text,
	Box,
	FormControl,
	Input,
	Stack,
	Heading
} from '@chakra-ui/react'

const LoginModal = ({ isOpen, onClose, finalRef, signIn }) => {
	const [login, setLogin] = useState(false)
	return (
		<>
			<Modal
				isCentered
				finalFocusRef={finalRef}
				isOpen={isOpen}
				onClose={onClose}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalCloseButton />
					<Stack align={'center'} pt={10}>
						<Heading fontSize={'4xl'}>
							{login ? 'Welcome back!' : 'Create your account'}
						</Heading>
						<Text fontSize={'lg'} color={'gray.500'}>
							{login
								? 'Enter your email to get the magic link to login'
								: 'to review all your favorite pokemon'}
						</Text>
					</Stack>

					<Box rounded={'lg'} boxShadow={'lg'} p={8}>
						<Stack spacing={5}>
							<Button
								colorScheme='gray'
								variant='outline'
								h='46px'
								onClick={() => signIn('google')}
							>
								<Image src='/google.svg' alt='Google' width={32} height={32} />
								<Text ml={2} fontWeight='400'>
									Sign {login ? 'in' : 'up'} with Google
								</Text>
							</Button>
							<FormControl id='email' h='46px'>
								<Input type='email' placeholder='ashketchum@pokemon.com' />
							</FormControl>

							<Stack pt={1}>
								<Button colorScheme='blue'>Sign in</Button>
							</Stack>
							<Stack>
								<Text align={'center'}>
									{login
										? "Don't have an account yet? "
										: 'Already have an account? '}
									<Text
										display='inline'
										color={'blue.400'}
										as='u'
										cursor='pointer'
										onClick={() => setLogin(!login)}
									>
										{login ? 'Sign up' : 'Login'}
									</Text>
								</Text>
							</Stack>
						</Stack>
					</Box>
				</ModalContent>
			</Modal>
		</>
	)
}

export default LoginModal
