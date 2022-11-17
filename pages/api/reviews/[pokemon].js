import { getSession } from 'next-auth/react'
import { prisma } from '../../../lib/prisma'

export default async function handler(req, res) {
	// Check if user is authenticated
	const session = await getSession({ req })

	let reviews = await prisma.review.findMany({
		where: {
			pokemon: req.query.pokemon
		},
		include: {
			author: true,
			favoritedBy: true
		}
	})

	if (!session) {
		// User is not authenticated
		reviews = reviews.map(review => {
			const favoritedByCurrentUser = false

			delete review.favoritedBy

			return { ...review, favoritedByCurrentUser }
		})

		return res.status(200).json(reviews)
	}
	////////////////////////////////////////////////////////////////

	const user = await prisma.user.findUnique({
		where: { email: session.user.email }
	})

	reviews = reviews.map(review => {
		const favoritedByCurrentUser = review.favoritedBy.some(
			el => el.id === user.id
		)

		delete review.favoritedBy

		return { ...review, favoritedByCurrentUser }
	})

	return res.status(200).json(reviews)
}
