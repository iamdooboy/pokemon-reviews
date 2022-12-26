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

	if (req.method === 'GET') {
		let favoritedPokemon = await prisma.pokemon.findMany({
			where: {
				favoritedBy: {
					some: {
						id: user.id
					}
				}
			},
			orderBy: {
				updatedAt: 'desc'
			}
		})

		favoritedPokemon = favoritedPokemon.map(fav => {
			return { ...fav, favoritedByCurrentUser: true }
		})

		res.status(200).json(favoritedPokemon)
	}

	if (req.method === 'PUT') {
		const { id, favorite, favoritedByCurrentUser } = req.body

		const toggleFunction = {
			[favoritedByCurrentUser ? 'connect' : 'disconnect']: {
				id: user.id
			}
		}

		const updatedPokemon = await prisma.pokemon.update({
			where: {
				id
			},
			data: {
				favorite,
				favoritedBy: {
					...toggleFunction
				}
			},
			select: { id: true, pokemon: true, favoritedBy: true, favorite: true }
		})

		const fav = updatedPokemon.favoritedBy.some(el => el.id === user.id)

		delete updatedPokemon.favoritedBy

		res.status(200).json({ ...updatedPokemon, favoritedByCurrentUser: fav })
	}
}
