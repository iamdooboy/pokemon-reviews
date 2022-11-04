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

	if (req.method === 'GET') {
		res.status(200).send(user)
	}

	if (req.method === 'PUT') {
		try {
			const { numberOfFavorites, id, toggle } = req.body

			const toggleFunction = {
				[!toggle ? 'connect' : 'disconnect']: {
					id: user.id
				}
			}

			const updatedPokemon = await prisma.pokemon.update({
				where: {
					id: id
				},
				data: {
					favorite: numberOfFavorites,
					favoritedBy: {
						...toggleFunction
					}
				}
				//select: { id: true, pokemon: true, favoritedBy: true }
			})
			res.status(200).json(updatedPokemon)
		} catch (e) {
			res.status(500).json({ message: 'Something went wrong' })
		}
	}
}
