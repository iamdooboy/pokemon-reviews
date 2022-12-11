import { getSession } from 'next-auth/react'
import { prisma } from '../../../lib/prisma'

export default async function handler(req, res) {
	const session = await getSession({ req })
	if (!session) {
		return res.status(401).json({ message: 'Unauthorized.' })
	}

	const user = await prisma.user.findUnique({
		where: { email: session.user.email }
	})

	if (req.method === 'DELETE') {
		const updatedData = await prisma.review.delete({
			where: {
				id: req.body.id
			}
		})

		res.status(200).json(updatedData)
	}

	if (req.method === 'PUT') {
		const { id, description, rating, favoritedByCurrentUser } = req.body
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

		res.status(200).json(updatedData)
	}

	if (req.method === 'POST') {
		try {
			const { description, rating, pokemon } = req.body

			const savedReview = await prisma.review.create({
				data: { description, rating, pokemon, authorId: user.id },
				include: {
					//return all fields from user model
					author: true
				}
			})
			res.status(200).json(savedReview)
		} catch (e) {
			throw e
		}
	}

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
				createdAt: 'asc'
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
}