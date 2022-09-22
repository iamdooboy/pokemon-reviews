import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
	if (req.method !== 'POST') {
		res.setHeader('Allow', ['POST'])
		return res
			.status(405)
			.json({ message: `HTTP method ${req.method} is not supported.` })
	}

	try {
		const reviewData = req.body

		const savedReview = await prisma.review.create({
			data: reviewData
		})
		res.status(200).json(savedReview)
	} catch (e) {
		res.status(500).json({ message: 'Something went wrong' })
	}
}
