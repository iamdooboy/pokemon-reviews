import { Box } from '@chakra-ui/react'
import Layout from '../components/layout'
import ReviewGrid from '../components/review-page/review-grid'
import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from '../pages/api/auth/[...nextauth]'

const MyReviews = () => {
	return (
		<Layout>
			<Box pt={16} flex={1} px='5' overflow='auto'>
				<ReviewGrid />
			</Box>
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
