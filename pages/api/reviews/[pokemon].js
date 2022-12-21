import { getSession } from 'next-auth/react'
import { prisma } from '../../../lib/prisma'

export default async function handler(req, res) {
	let reviews = await prisma.review.findMany({
		where: {
			pokemon: req.query.pokemon
		},
		include: {
			author: true,
			favoritedBy: true
		},
		orderBy: {
			createdAt: 'desc'
		}
	})

	const session = await getSession({ req })

	if (!session) {
		reviews = reviews.map(review => {
			const favoritedByCurrentUser = false
			const reviewedThisPokemon = false

			delete review.favoritedBy

			return { ...review, favoritedByCurrentUser, reviewedThisPokemon }
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

		const reviewedThisPokemon = review.authorId === user.id

		delete review.favoritedBy

		return { ...review, favoritedByCurrentUser, reviewedThisPokemon }
	})

	return res.status(200).json(reviews)
}
