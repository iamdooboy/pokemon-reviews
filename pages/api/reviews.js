import { getSession } from 'next-auth/react'
import { prisma } from '../../lib/prisma'

export default async function handler(req, res) {
	// Check if user is authenticated
	const session = await getSession({ req })
	if (!session) {
		return res.status(401).json({ message: 'Unauthorized.' })
	}

	if (req.method === 'DELETE') {
		await prisma.review.delete({
			where: {
				id: req.body.id
			}
		})
		res.status(200).json({ message: 'Review Deleted' })
	}

	if (req.method === 'POST') {
		try {
			const user = await prisma.user.findUnique({
				where: { email: session.user.email }
			})

			const reviewData = req.body

			const savedReview = await prisma.review.create({
				data: { ...reviewData, authorId: user.id },
				include: {
					//return all fields from user model
					author: true
				}
			})
			res.status(200).json(savedReview)
		} catch (e) {
			console.log(e)
			res.status(500).json({ message: 'Something went wrong' })
		}
	}
}
