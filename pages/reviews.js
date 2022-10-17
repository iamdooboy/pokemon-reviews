import { Box, Flex, Heading } from '@chakra-ui/react'
import React from 'react'
import Layout from '../components/layout'
import Sidebar from '../components/sidebar/sidebar'
import ReviewGrid from '../components/review-page/review-grid'
import { getSession } from 'next-auth/react'

const MyReviews = ({ reviews }) => {
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
						Your Reviews
					</Heading>
					<ReviewGrid {...{ reviews }} />
				</Box>
			</Flex>
		</Layout>
	)
}

export const getServerSideProps = async context => {
	const session = await getSession(context)

	const user = await prisma.user.findUnique({
		where: { email: session.user.email }
	})

	let reviews = await prisma.review.findMany({
		//return all reviews for current user
		where: {
			authorId: user.id
		},
		include: {
			favoritedBy: true
		},
		orderBy: {
			createdAt: 'desc'
		}
	})

	reviews = reviews.map(review => {
		const favoritedByCurrentUser = review.favoritedBy.some(
			el => el.id === user.id
		)

		const { favoritedBy, ...reviewRest } = review //remove favoritedBy
		return { ...reviewRest, favoritedByCurrentUser }
	})

	return {
		props: {
			reviews: JSON.parse(JSON.stringify(reviews))
		}
	}
}

export default MyReviews
