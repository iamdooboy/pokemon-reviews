import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'
import { prisma } from '../../../lib/prisma'

export default async function handler(req, res) {
	// Check if user is authenticated
	const session = await unstable_getServerSession(req, res, authOptions)
	if (!session) {
		return res.status(401).json({ message: 'Unauthorized.' })
	}

	const user = await prisma.user.findUnique({
		where: { email: session.user.email }
	})

	const { favorite, id, favoritedByCurrentUser, count, average, duplicate } =
		req.body
	const toggleFunction = {
		[favoritedByCurrentUser ? 'connect' : 'disconnect']: {
			id: user.id
		}
	}

	let updatedData = await prisma.review.update({
		where: {
			id
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

	updatedData = {
		...updatedData,
		favoritedByCurrentUser
	}

	res.status(200).json({ updatedData, newAverage: average, duplicate, count })
}
