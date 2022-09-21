import { ChakraProvider } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { supabaseClient } from '../lib/client'
import theme from '../lib/theme'

const Website = ({ Component, pageProps }) => {
	const router = useRouter()
	const user = supabaseClient.auth.user()

	useEffect(() => {
		const { data: authListener } = supabaseClient.auth.onAuthStateChange(
			(event, session) => {
				handleAuthSession(event, session)
				if (event === 'SIGNED_IN') {
					const loggedinUser = supabaseClient.auth.user()
					const userId = loggedinUser.id
					supabaseClient
						.from('profiles')
						.upsert({ id: userId })
						.then((_data, error) => {
							if (!error) {
								router.push('/')
							}
						})
				}
				if (event === 'SIGNED_OUT') {
					router.push('/login')
				}
			}
		)

		return () => {
			authListener.unsubscribe()
		}
	}, [router])

	useEffect(() => {
		if (user) {
			if (router.pathname === '/login') {
				router.push('/')
			}
		}
	}, [router.pathname, user, router])

	const handleAuthSession = async (event, session) => {
		await fetch('/api/auth', {
			method: 'POST',
			headers: new Headers({ 'Content-Type': 'application/json' }),
			credentials: 'same-origin',
			body: JSON.stringify({ event, session })
		})
	}

	return (
		<ChakraProvider theme={theme}>
			<Component {...pageProps} />
		</ChakraProvider>
	)
}

export default Website
