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

	let sum = 0
	let average = 0
	let duplicate = false

	if (reviews.length > 0) {
		sum = reviews.reduce((acc, review) => acc + review.rating, 0)
		average = Math.round((sum / reviews.length) * 10) / 10
	}

	const session = await getSession({ req })

	if (!session) {
		reviews = reviews.map(review => {
			const favoritedByCurrentUser = false
			const reviewedThisPokemon = false

			delete review.favoritedBy

			return { ...review, favoritedByCurrentUser, reviewedThisPokemon }
		})

		return res
			.status(200)
			.json({ reviews, average, count: reviews.length, duplicate })
	}
	////////////////////////////////////////////////////////////////

	const user = await prisma.user.findUnique({
		where: { email: session.user.email }
	})

	reviews = reviews.map(review => {
		const favoritedByCurrentUser = review.favoritedBy.some(
			el => el.id === user.id
		)

		duplicate = review.authorId === user.id

		delete review.favoritedBy

		return { ...review, favoritedByCurrentUser }
	})

	return res
		.status(200)
		.json({ reviews, average, count: reviews.length, duplicate })
}
