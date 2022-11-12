import { Box, Flex, Heading } from '@chakra-ui/react'
import Layout from '../components/layout'
import Sidebar from '../components/sidebar/sidebar'
import ReviewGrid from '../components/review-page/review-grid'
//import { prisma } from '../lib/prisma'
import React, { useEffect, useState } from 'react'
// import { ReviewGridSkeleton } from '../components/loading/review-box-skeleton'
// import { unstable_getServerSession } from 'next-auth/next'
// import { authOptions } from '../pages/api/auth/[...nextauth]'
// import { SWRConfig } from 'swr'
// import axios from 'axios'

const MyReviews = () => {
	// const [isLoaded, setIsLoaded] = useState(false)

	// useEffect(() => {
	// 	setIsLoaded(true)
	// }, [reviews])

	return (
		// <SWRConfig value={{ fallback }}>
		<Layout>
			<Flex pt={16}>
				<Sidebar />
				<Box
					flex={1}
					px='5'
					overflow='auto'
					maxH='calc(100vh - var(--chakra-sizes-16))' //viewheight - navbar height
				>
					<Heading as='h1' size='lg' align='left' py={8}>
						Your Reviews
					</Heading>
					{/* {reviews.length === 0 && <Box>You don&apos;t have any reviews</Box>}
						{isLoaded ? <ReviewGrid {...{ reviews }} /> : ReviewGridSkeleton} */}
					{/* <ReviewGrid /> */}
					<ReviewGrid />
				</Box>
			</Flex>
		</Layout>
		// </SWRConfig>
	)
}

// export const getServerSideProps = async context => {
// 	const session = await unstable_getServerSession(
// 		context.req,
// 		context.res,
// 		authOptions
// 	)

// 	if (!session) {
// 		return {
// 			notFound: true
// 		}
// 	}

// 	const user = await prisma.user.findUnique({
// 		where: { email: session.user.email }
// 	})

// 	let reviews = await prisma.review.findMany({
// 		//return all reviews for current user
// 		where: {
// 			authorId: user.id
// 		},
// 		include: {
// 			favoritedBy: true
// 		},
// 		orderBy: {
// 			createdAt: 'desc'
// 		}
// 	})

// 	reviews = reviews.map(review => {
// 		const favoritedByCurrentUser = review.favoritedBy.some(
// 			el => el.id === user.id
// 		)

// 		delete review.favoritedBy

// 		return { ...review, favoritedByCurrentUser }
// 	})

// 	console.log('from review page')
// 	console.log(reviews)
// 	return {
// 		props: {
// 			fallback: {
// 				['/api/reviews/']: JSON.parse(JSON.stringify(reviews))
// 			}
// 		}
// 	}
// }

export default MyReviews
