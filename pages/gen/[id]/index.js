import { useEffect, useState } from 'react'
import PokemonGrid from '../../../components/gen-page/pokemon-grid'
import { getPokemonGenPage } from '../../../utils/axios'
import { Heading, Flex, Box } from '@chakra-ui/react'
import Layout from '../../../components/layout'
import Sidebar from '../../../components/sidebar/sidebar'
import { GenPageSkeleton } from '../../../components/loading/gen-page-skeleton'
import { useRouter } from 'next/router'

const GenerationPage = ({ data = [] }) => {
	const router = useRouter()
	const [isLoaded, setIsLoaded] = useState(false)

	useEffect(() => {
		if (data) {
			setIsLoaded(true)
		}
		const handleStart = url => {
			if (url === '/reviews' || url === '/favorites' || url === '/settings') {
				setIsLoaded(true)
				return
			}
			setIsLoaded(false)
		}

		const handleStop = () => {
			setIsLoaded(true)
		}

		router.events.on('routeChangeStart', handleStart)
		router.events.on('routeChangeComplete', handleStop)
		router.events.on('routeChangeError', handleStop)

		return () => {
			router.events.off('routeChangeStart', handleStart)
			router.events.off('routeChangeComplete', handleStop)
			router.events.off('routeChangeError', handleStop)
		}
	}, [router, data])

	return (
		<Layout>
			<Flex pt={16}>
				<Sidebar />
				<Box
					flex={1}
					px='5'
					overflow='auto'
					maxH='calc(100vh - var(--chakra-sizes-16))' //viewheight - navbar height
				>
					<Heading as='h1' size='xl' align='center' py={4}>
						Pokemon Reviews
					</Heading>
					<Heading as='h1' size='md' align='center' py={4}>
						Nintendo has been creating a lot of questionable Pokemon. Luckily
						they are looking for your feedback.
					</Heading>
					{!isLoaded ? <GenPageSkeleton /> : <PokemonGrid data={data} />}
				</Box>
			</Flex>
		</Layout>
	)
}

export const getServerSideProps = async context => {
	const isNumber = input => {
		if (input === '') {
			return false
		}
		let regex = new RegExp(/[^0-9]/, 'g')
		return input.match(regex) === null
	}

	if (!isNumber(context.query.id)) {
		return {
			notFound: true
		}
	}

	const id = parseInt(context.query.id)
	if (id <= 0 || id >= 9) {
		return {
			notFound: true
		}
	}

	const response = await getPokemonGenPage(context.query.id)

	return {
		props: {
			data: response
		}
	}
}

export default GenerationPage
