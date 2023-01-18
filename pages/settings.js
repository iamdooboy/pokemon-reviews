import { useState } from 'react'
import axios from 'axios'
import { authOptions } from './api/auth/[...nextauth]'
import {
	Container,
	Box,
	FormControl,
	Button,
	Flex,
	useToast
} from '@chakra-ui/react'
import Layout from '../components/layout'
import { unstable_getServerSession } from 'next-auth/next'
import { useAsyncToast } from '../hooks/useAsyncToast'
import AvatarSelection from '../components/settings-page/avatar-selection'
import Username from '../components/settings-page/username'
import { supabase } from '../lib/supabase'

const Settings = ({ user }) => {
	const [avatar, setAvatar] = useState({ src: user.image, isLoading: false })
	const [name, setName] = useState(user.name)

	const toast = useToast()
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
				title: 'Profile updated.',
				position: 'bottom-right',
				status: 'success',
				duration: 3000,
				isClosable: true
			})
			const event = new Event('visibilitychange') //refresh session
			document.dispatchEvent(event)
		}
	}

	const onSubmitHandler = async e => {
		setIsLoading(true)
		e.preventDefault()

		if (avatar.file) {
			setAvatar(prev => ({ ...prev, isLoading: true }))
			const src = await uploadCustomAvatar()
			updateUser({ src }, name)
			setAvatar({ src, isLoading: false })
			return
		}
		updateUser(avatar, name)
	}

	return (
		<Layout>
			<Flex pt={16}>
				<Container
					pt={16}
					py={8}
					color='white'
					flex={1}
					px='5'
					overflow='auto'
					maxH='calc(100vh - var(--chakra-sizes-16))' //viewheight - navbar height
				>
					<FormControl
						borderWidth={1}
						color='white'
						p='5'
						rounded='md'
						as='form'
						onSubmit={onSubmitHandler}
						align='center'
					>
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
				</Container>
			</Flex>
		</Layout>
	)
}

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

	return {
		props: {
			user
		}
	}
}

export default Settings
