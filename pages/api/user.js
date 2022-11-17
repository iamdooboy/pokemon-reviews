import { getSession } from 'next-auth/react'
import { prisma } from '../../lib/prisma'

export default async function handler(req, res) {
	const session = await getSession({ req })
	if (!session) {
		return res.status(401).json({ message: 'Unauthorized.' })
	}

	const user = await prisma.user.findUnique({
		where: { email: session.user.email }
	})

	if (req.method === 'GET') {
		return res.status(200).json(user)
	} else {
		await prisma.user.update({
			where: {
				id: user.id
			},
			data: {
				name: req.body.name,
				image: req.body.avatar.src
			}
		})
		return res.status(200).json({ message: 'User Updated' })
	}
}
