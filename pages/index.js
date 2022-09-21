import { Container, Heading, Box, Input } from '@chakra-ui/react'
import Head from 'next/head'
import PokemonContainer from '../components/pokemon-container'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { supabaseClient } from '../lib/client'
import Layout from '../components/layout'
import CommentBox from '../components/pokemon-page/comments/comment-box'
import CommentModal from '../components/pokemon-page/comments/add-comment-modal'
import { PrismaClient } from '@prisma/client'

const Page = ({ reviews = [] }) => {
	const router = useRouter()
	const user = supabaseClient.auth.user()

	useEffect(() => {
		if (!user) {
			router.push('/login')
		}
	}, [user, router])

	return (
		<Layout>
			<Heading as='h1' size='xl' align='center' py={4}>
				Pokemon Reviews
			</Heading>
			<Heading as='h1' size='md' align='center' py={4}>
				Nintendo has been creating a lot of questionable Pokemon. Luckily they
				are looking for your feedback.
			</Heading>

			{/* <PokemonContainer /> */}
			<CommentModal />
			{reviews.map((review, index) => (
				<CommentBox review={review} key={index} />
			))}
		</Layout>
	)
}

export async function getServerSideProps() {
	const prisma = new PrismaClient()
	const reviews = await prisma.review.findMany()

	return {
		props: {
			reviews: JSON.parse(JSON.stringify(reviews))
		}
	}
}

export default Page
