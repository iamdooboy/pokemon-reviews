import { getSession } from 'next-auth/react'
import prisma from '../../lib/prisma'

export default async function handler(req, res) {
	const session = await getSession({ req })
	// if (!session) {
	// 	return res.status(403)
	// }
	const user = await prisma.user.findUnique({
		where: { email: session.user.email }
	})
	if (session) {
		res.status(200).send(user.id)
	}
}
