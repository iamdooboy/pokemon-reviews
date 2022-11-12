import { getSession } from 'next-auth/react'
import { prisma } from '../../lib/prisma'

export default async function handler(req, res) {
	// Check if user is authenticated
	const session = await getSession({ req })
	if (!session) {
		return res.status(401).json({ message: 'Unauthorized.' })
	}

	const user = await prisma.user.findUnique({
		where: { email: session.user.email }
	})

	if (req.method === 'GET') {
		try {
			let reviews = await prisma.review.findMany({
				where: {
					pokemon: req.query.pokemon
				},
				include: {
					author: true,
					favoritedBy: true
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
}
