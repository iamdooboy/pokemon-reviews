import { Box, Flex } from '@chakra-ui/react'
import Layout from '../components/layout'
import Sidebar from '../components/sidebar/sidebar'
import ReviewGrid from '../components/review-page/review-grid'
import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from '../pages/api/auth/[...nextauth]'
//import { prisma } from '../lib/prisma'
// import { ReviewGridSkeleton } from '../components/loading/review-box-skeleton'
// import { SWRConfig } from 'swr'
// import axios from 'axios'

const MyReviews = () => {
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
					<ReviewGrid />
				</Box>
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

	return {
		props: {
			session
		}
	}
}

export default MyReviews
