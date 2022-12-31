import { useState } from 'react'
import axios from 'axios'
import { authOptions } from './api/auth/[...nextauth]'
import {
	Container,
	Box,
	FormControl,
	FormLabel,
	FormHelperText,
	Input,
	Avatar,
	SimpleGrid,
	Button,
	Flex,
	useToast
} from '@chakra-ui/react'
import Layout from '../components/layout'
import { unstable_getServerSession } from 'next-auth/next'
import { useAsyncToast } from '../hooks/useAsyncToast'
import { FallBackImage } from '../utils/fallback-image'
import { FileUpload } from '../components/file-upload'
import AvatarSelection from '../components/settings-page/avatar-selection'
import Username from '../components/settings-page/username'
import { supabase } from '../lib/supabase'

const Settings = ({ user }) => {
	const [avatar, setAvatar] = useState({ src: user.image })
	const [name, setName] = useState(user.name)

	const toast = useToast()
	const [isLoading, setIsLoading] = useAsyncToast(false, {
		title: 'Loading...',
		position: 'bottom-right'
	})

	const onSubmitHandler = async e => {
		//setIsLoading(true)
		e.preventDefault()
		try {
			const { error } = await supabase.storage
				.from(process.env.NEXT_PUBLIC_SUPABASE_BUCKET)
				.upload(avatar.fileName, avatar.file)

			if (error) {
				throw new Error('Unable to upload image to storage')
			}

			const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${process.env.NEXT_PUBLIC_SUPABASE_BUCKET}/${avatar.fileName}}`
			console.log(imageUrl)
		} catch (e) {
			console.log(e)
		}

		// const res = await axios.put('/api/user', { avatar, name })
		// if (res) {
		// 	setIsLoading(false)
		// 	toast({
		// 		title: 'Profile updated.',
		// 		position: 'bottom-right',
		// 		status: 'success',
		// 		duration: 1500,
		// 		isClosable: true
		// 	})
		// 	const event = new Event('visibilitychange') //refresh session
		// 	document.dispatchEvent(event)
		// }
	}

	return (
		<Layout>
			<Flex pt={16}>
				<Container
					pt={8}
					color='white'
					flex={1}
					px='5'
					overflow='auto'
					maxH='calc(100vh - var(--chakra-sizes-16))' //viewheight - navbar height
				>
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
