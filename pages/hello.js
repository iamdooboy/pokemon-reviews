import axios from 'axios'
import { useState } from 'react'
import { authOptions } from './api/auth/[...nextauth]'
import {
	Container,
	Box,
	FormControl,
	Button,
	Heading,
	useToast
} from '@chakra-ui/react'
import { unstable_getServerSession } from 'next-auth/next'
import { splitEmail } from '../utils/helpers'
import { useRouter } from 'next/router'
import { useAsyncToast } from '../hooks/useAsyncToast'
import AvatarSelection from '../components/settings-page/avatar-selection'
import Username from '../components/settings-page/username'
import { supabase } from '../lib/supabase'

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

const Hello = ({ email, randomNumber }) => {
	const username = splitEmail(email)
	const randomAvatar = avatars[randomNumber]

	const [avatar, setAvatar] = useState({
		src: randomAvatar.src,
		isLoading: false
	})
	const [name, setName] = useState(username)

	const toast = useToast()
	const router = useRouter()

	const [isLoading, setIsLoading] = useAsyncToast(false, {
		title: 'Loading...',
		position: 'bottom-right'
	})

	const uploadCustomAvatar = async () => {
		try {
			const { data, error } = await supabase.storage
				.from(process.env.NEXT_PUBLIC_SUPABASE_BUCKET)
				.upload(avatar.fileName, avatar.file)

			if (error) {
				throw new Error('Unable to upload image to storage')
			}

			const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${data.Key}`
			return imageUrl
		} catch (e) {
			toast({
				title: 'Something went wrong',
				description: 'Please try again',
				position: 'bottom-right',
				status: 'error',
				duration: 3000,
				isClosable: true
			})
		}
	}

	const updateUser = async (src, username) => {
		const res = await axios.put('/api/user', { avatar: src, name: username })
		if (res) {
			setIsLoading(false)
			toast({
				title: 'Profile created.',
				position: 'bottom-right',
				status: 'success',
				duration: 2000,
				isClosable: true
			})
			const event = new Event('visibilitychange') //refresh session
			document.dispatchEvent(event)
		}
	}

	const refresh = () => {
		router.push('/')
		const event = new Event('visibilitychange') //refresh session
		document.dispatchEvent(event)
	}

	const onSubmitHandler = async e => {
		setIsLoading(true)
		e.preventDefault()
		setAvatar(prev => ({ ...prev, isLoading: true }))
		if (avatar.file) {
			const src = await uploadCustomAvatar()
			updateUser({ src }, name)
			setAvatar({ src, isLoading: false })
			refresh()
			return
		}
		updateUser(avatar, name)
		refresh()
	}

	return (
		<Box py={14}>
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
					<FormControl>
						<Username setName={setName} name={name} />
						<AvatarSelection avatar={avatar} setAvatar={setAvatar} />
						<Button
							isLoading={isLoading}
							type='submit'
							colorScheme='teal'
							w='full'
							mt={5}
							mb={2}
						>
							Save
						</Button>
					</FormControl>
				</Box>
			</Container>
		</Box>
	)
}

export default Hello

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

	if (user.name) {
		return {
			redirect: {
				destination: '/',
				permanent: false
			}
		}
	}

	const randomNumber = Math.floor(Math.random() * 18) + 1

	return {
		props: {
			email: user.email,
			randomNumber
		}
	}
}
