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

		// const favoritedBy = updatedData.favoritedBy.some(el => el.id === user.id)

		// updatedData = { ...updatedData, favoritedByCurrentUser: favoritedBy }

		res.status(200).json(updatedData)
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
