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
import Sidebar from '../components/sidebar/sidebar'
import { unstable_getServerSession } from 'next-auth/next'
import { useAsyncToast } from '../hooks/useAsyncToast'
import { FallBackImage } from '../utils/fallback-image'

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

const Settings = ({ user }) => {
	const [avatar, setAvatar] = useState({ src: user.image })
	const [name, setName] = useState(user.name)

	const toast = useToast()
	const [isLoading, setIsLoading] = useAsyncToast(false, {
		title: 'Loading...',
		position: 'bottom-right'
	})

	const onSubmitHandler = async e => {
		setIsLoading(true)
		e.preventDefault()
		const res = await axios.put('/api/user', { avatar, name })
		if (res) {
			setIsLoading(false)
			toast({
				title: 'Profile updated.',
				position: 'bottom-right',
				status: 'success',
				duration: 1500,
				isClosable: true
			})
			const event = new Event('visibilitychange') //refresh session
			document.dispatchEvent(event)
		}
	}

	return (
		<Layout>
			<Flex pt={16}>
				<Sidebar />
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
						<Avatar size='xl' name='test' src={avatar.src} my={10} />
						<FormControl>
							<FormLabel>Name</FormLabel>
							<Input
								type='text'
								value={name}
								onChange={e => setName(e.target.value)}
							/>
							<FormHelperText align='left'>
								This is your public display name when leaving reviews
							</FormHelperText>

							<FormLabel mt={5}>Avatar</FormLabel>
							<SimpleGrid columns={[2, 3, 3, 6]} spacing={6} py={4}>
								{avatars.map(a => (
									<Box align='center' justify='center' key={a.type}>
										<FallBackImage
											onClick={() => setAvatar(a)}
											opacity={avatar.src === a.src ? 0.3 : 1}
											alt={a.type}
											src={a.src}
											width={40}
											height={40}
											cursor='pointer'
										/>
									</Box>
								))}
							</SimpleGrid>
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
