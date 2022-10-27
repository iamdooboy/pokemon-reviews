import axios from 'axios'
import React, { useState } from 'react'
import { authOptions } from './api/auth/[...nextauth]'
import {
	Container,
	Box,
	FormControl,
	FormLabel,
	FormHelperText,
	Input,
	SimpleGrid,
	Avatar,
	Button,
	Heading,
	useToast
} from '@chakra-ui/react'
import { unstable_getServerSession } from 'next-auth/next'
import { useSession } from 'next-auth/react'
import { splitEmail } from '../utils/helpers'
import { useRouter } from 'next/router'
import { useAsyncToast } from '../hooks/useAsyncToast'

const avatars = [
	{ type: 'bug', src: '/avatar/bug.svg' },
	{ type: 'dark', src: '/avatar/dark.svg' },
	{ type: 'dragon', src: '/avatar/dragon.svg' },
	{ type: 'electric', src: '/avatar/electric.svg' },
	{ type: 'fairy', src: '/avatar/fairy.svg' },
	{ type: 'fighting', src: '/avatar/fighting.svg' },
	{ type: 'fire', src: '/avatar/fire.svg' },
	{ type: 'flying', src: '/avatar/flying.svg' },
	{ type: 'ghost', src: '/avatar/ghost.svg' },
	{ type: 'grass', src: '/avatar/grass.svg' },
	{ type: 'ground', src: '/avatar/ground.svg' },
	{ type: 'ice', src: '/avatar/ice.svg' },
	{ type: 'normal', src: '/avatar/normal.svg' },
	{ type: 'poison', src: '/avatar/poison.svg' },
	{ type: 'psychic', src: '/avatar/psychic.svg' },
	{ type: 'rock', src: '/avatar/rock.svg' },
	{ type: 'steel', src: '/avatar/steel.svg' },
	{ type: 'water', src: '/avatar/water.svg' }
]

const Welcome = () => {
	const { data: session } = useSession()

	const toast = useToast()
	const router = useRouter()

	const [isLoading, setIsLoading] = useAsyncToast(false, {
		title: 'Loading...',
		position: 'bottom-right'
	})

	const username = splitEmail(session.user.email)

	const [avatar, setAvatar] = useState(avatars[0])
	const [name, setName] = useState(username)

	const onSubmitHandler = async e => {
		setIsLoading(true)
		e.preventDefault()
		const res = await axios.put('/api/user', { avatar, name })
		if (res) {
			setIsLoading(false)
			toast({
				title: 'User updated.',
				position: 'bottom-right',
				status: 'error',
				duration: 1500,
				isClosable: true
			})
			router.push('/')
			const event = new Event('visibilitychange') //refresh session
			document.dispatchEvent(event)
		}
	}

	return (
		<Box py={20}>
			<Container color='white'>
				<Heading fontSize='2xl' mb={5}>
					Setup your profile
				</Heading>
				<Box
					borderWidth={1}
					p={4}
					align='center'
					rounded='md'
					as='form'
					onSubmit={onSubmitHandler}
				>
					<Avatar size='2xl' name={username} src={avatar.src} my={10} />
					<FormControl>
						<FormLabel>Name</FormLabel>
						<Input
							type='text'
							value={name}
							onChange={e => setName(e.target.value)}
						/>
						<FormHelperText align='left'>
							This is a your public display name when leaving reviews
						</FormHelperText>

						<FormLabel mt={5}>Avatar</FormLabel>
						<SimpleGrid columns={[2, 3, 6]} spacing={6} py={4}>
							{avatars.map(a => (
								<Avatar
									key={a.type}
									onClick={() => setAvatar(a)}
									opacity={avatar.type === a.type ? 0.3 : 1}
									size='md'
									name={a.type}
									src={a.src}
									cursor='pointer'
								/>
							))}
						</SimpleGrid>
						<Button
							type='submit'
							colorScheme='teal'
							mt={5}
							w='full'
							isLoading={isLoading}
						>
							Save
						</Button>
					</FormControl>
				</Box>
			</Container>
		</Box>
	)
}

export default Welcome

export const getServerSideProps = async context => {
	const session = await unstable_getServerSession(
		context.req,
		context.res,
		authOptions
	)

	if (!session) {
		return {
			notFound: true
		}
	}

	const { user } = session || {}

	if (user?.name) {
		return {
			notFound: true
		}
	}

	return {
		props: {
			session: session
		}
	}
}
