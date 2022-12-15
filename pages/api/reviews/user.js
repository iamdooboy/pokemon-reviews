import { getSession } from 'next-auth/react'
import { prisma } from '../../../lib/prisma'

export default async function handler(req, res) {
	// Check if user is authenticated
	const session = await getSession({ req })
	if (!session) {
		return res.status(401).json({ message: 'Unauthorized.' })
	}

	const user = await prisma.user.findUnique({
		where: { email: session.user.email }
	})

	try {
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

			delete review.favoritedBy

			return { ...review, favoritedByCurrentUser }
		})

		res.status(200).json(reviews)
	} catch (e) {
		res.status(500).json({ message: 'Something went wrong' })
	}
}
