import React, { useState } from 'react'
import Image from 'next/image'
import {
	chakra,
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
	Heading,
	useToast,
	Icon
} from '@chakra-ui/react'
import { useAsyncToast } from '../../hooks/useAsyncToast'
import { HiOutlineMailOpen } from 'react-icons/hi'

const LoginModal = ({ isOpen, onClose, finalRef, signIn, login, setLogin }) => {
	const [input, setInput] = useState('')
	const [error, setError] = useState(false)
	const [confirm, setConfirm] = useState(false)
	const toast = useToast()

	const [isLoading, setIsLoading] = useAsyncToast(false, {
		title: 'Loading...',
		position: 'top'
	})

	const signInWithEmail = async () => {
		if (!input) {
			setError(true)
			toast({
				title: 'Unable to sign up',
				description: 'Please enter an email.',
				status: 'error',
				duration: 3000,
				isClosable: true,
				position: 'top'
			})
			return
		}
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input)) {
			setError(true)
			toast({
				title: 'Unable to sign up',
				description: 'Please enter a valid email.',
				status: 'error',
				duration: 3000,
				isClosable: true,
				position: 'top'
			})
			return
		}
		try {
			setIsLoading(true)
			const { error } = await signIn('email', {
				email: input,
				redirect: false,
				callbackUrl: window.location.href
			})
			if (error) {
				throw new Error(error)
			}
			setConfirm(true)
			setIsLoading(false)
		} catch (error) {
			setIsLoading(false)
			setError(true)
			toast({
				title: 'Unable to sign in',
				description: 'Something went wrong',
				status: 'error',
				duration: 3000,
				isClosable: true,
				position: 'top'
			})
		}
	}

	const onCloseHandler = () => {
		setLogin(false)
		setInput('')
		setConfirm(false)
		setError(false)
		onClose()
	}
	return (
		<Modal
			isCentered
			finalFocusRef={finalRef}
			isOpen={isOpen}
			onClose={onCloseHandler}
		>
			<ModalOverlay />
			<ModalContent>
				<ModalCloseButton />

				{confirm ? (
					<Box align={'center'} p={10} my={16}>
						<Icon as={HiOutlineMailOpen} w={12} h={12} color='teal.300' />
						<Heading as='h3' size='lg'>
							Confirm your email
						</Heading>
						<Text fontSize='lg' align='center' mt={6} color='gray.300'>
							We emailed a magic link to{' '}
							<chakra.span display='inline' color='white'>
								{input}
							</chakra.span>
							{'. '}
							Check your inbox and click the link in the email to login or sign
							up.
						</Text>
					</Box>
				) : (
					<Box>
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
									gap={2}
									onClick={() => signIn('google')}
								>
									<Image
										src='/google.svg'
										alt='Google'
										width={32}
										height={32}
									/>
									<Text fontWeight='400'>
										Sign {login ? 'in' : 'up'} with Google
									</Text>
								</Button>
								<FormControl id='email' h='46px' isInvalid={error}>
									<Input
										onChange={e => setInput(e.target.value)}
										type='email'
										placeholder='ashketchum@pokemon.com'
									/>
								</FormControl>

								<Stack pt={1}>
									<Button
										onClick={signInWithEmail}
										colorScheme='blue'
										isDisabled={isLoading}
									>
										{isLoading ? 'Loading...' : login ? 'Sign in' : 'Sign up'}
									</Button>
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
					</Box>
				)}
			</ModalContent>
		</Modal>
	)
}

export default LoginModal
