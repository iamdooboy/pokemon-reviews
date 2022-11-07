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

	if (req.method === 'DELETE') {
		const updatedData = await prisma.review.delete({
			where: {
				id: req.body.id
			}
		})

		res.status(200).json(updatedData)
	}

	if (req.method === 'PUT') {
		if (req.body.api === 'PUT_REVIEW') {
			const updateData = await prisma.review.update({
				where: {
					id: req.body.id
				},
				data: {
					description: req.body.description,
					rating: req.body.rating
				},
				include: {
					//return all fields from user model
					author: true
				}
			})
			res.status(200).json(updateData)
		} else {
			const { favorite, id, favoritedByCurrentUser } = req.body
			const toggleFunction = {
				[favoritedByCurrentUser ? 'connect' : 'disconnect']: {
					id: user.id
				}
			}
			const updateData = await prisma.review.update({
				where: {
					id: id
				},
				data: {
					favorite,
					favoritedBy: {
						...toggleFunction
					}
				},
				include: {
					//return all fields from user model
					author: true
				}
			})

			res.status(200).json(updateData)
		}
	}

	if (req.method === 'POST') {
		try {
			const user = await prisma.user.findUnique({
				where: { email: session.user.email }
			})

			const { description, rating, pokemon } = req.body

			const savedReview = await prisma.review.create({
				// data: { ...reviewData, authorId: user.id },
				data: { description, rating, pokemon, authorId: user.id },
				include: {
					//return all fields from user model
					author: true
				}
			})
			res.status(200).json(savedReview)
		} catch (e) {
			res.status(500).json({ message: 'Something went wrong' })
		}
	}

	if (req.method === 'GET') {
		try {
			const reviews = await prisma.review.findMany({
				where: {
					pokemon: req.query.pokemon
				}
			})

			res.status(200).json(reviews)
		} catch (e) {
			res.status(500).json({ message: 'Something went wrong' })
		}
	}
}
