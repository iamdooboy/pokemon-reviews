import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'
import { prisma } from '../../../lib/prisma'

export default async function handler(req, res) {
	const session = await unstable_getServerSession(req, res, authOptions)

	if (!session) {
		return res.status(401).json({ message: 'Unauthorized.' })
	}

	const user = await prisma.user.findUnique({
		where: { email: session.user.email }
	})

	if (req.method === 'GET') {
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
	}

	if (req.method === 'DELETE') {
		const { review, count, average } = req.body

		const updatedData = await prisma.review.delete({
			where: {
				id: review.id
			}
		})

		const newCount = count - 1
		const sum = average * count - review.rating
		const newAverage = Math.round((sum / newCount) * 10) / 10

		res.status(200).json({
			updatedData,
			average: newAverage,
			count: newCount,
			duplicate: false
		})
	}

	if (req.method === 'PUT') {
		const { id, description, rating, favoritedByCurrentUser, count, average } =
			req.body
		let updatedData = await prisma.review.update({
			where: {
				id
			},
			data: {
				description,
				rating
			},
			include: {
				//return all fields from user model
				author: true
			}
		})

		updatedData = {
			...updatedData,
			favoritedByCurrentUser
		}

		const sum = average + updatedData.rating
		const newAverage = Math.round((sum / count) * 10) / 10

		res.status(200).json({ updatedData, newAverage, duplicate: true, count })
	}

	if (req.method === 'POST') {
		try {
			const { description, rating, pokemon, dexId, gen, count, average } =
				req.body

			const savedReview = await prisma.review.create({
				data: { description, rating, pokemon, authorId: user.id, dexId, gen },
				include: {
					//return all fields from user model
					author: true
				}
			})
			const newCount = count + 1
			const sum = average + savedReview.rating
			const newAverage = Math.round((sum / newCount) * 10) / 10

			res
				.status(200)
				.json({ savedReview, newAverage, newCount, duplicate: true })
		} catch (e) {
			throw e
		}
	}
}
