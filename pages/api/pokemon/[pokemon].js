import { getSession } from 'next-auth/react'
import { prisma } from '../../../lib/prisma'

export default async function handler(req, res) {
	const session = await getSession({ req })

	if (req.method === 'PUT') {
		if (!session) {
			return res.status(401).json({ message: 'Unauthorized.' })
		}

		const user = await prisma.user.findUnique({
			where: { email: session.user.email }
		})
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
			select: { id: true, favoritedBy: true, favorite: true }
		})

		const fav = updatedPokemon.favoritedBy.some(el => el.id === user.id)

		delete updatedPokemon.favoritedBy

		res.status(200).json({ ...updatedPokemon, favoritedByCurrentUser: fav })
	}

	if (req.method === 'GET') {
		const selectedPokemon = await prisma.pokemon.findUnique({
			where: {
				pokemon: req.query.pokemon
			},
			select: {
				id: true,
				favorite: true,
				favoritedBy: true
			}
		})

		if (!session) {
			return res
				.status(200)
				.json({ ...selectedPokemon, favoritedByCurrentUser: false })
		}

		const user = await prisma.user.findUnique({
			where: { email: session.user.email }
		})

		const favoritedByCurrentUser = selectedPokemon.favoritedBy.some(
			el => el.id === user.id
		)

		delete selectedPokemon.favoritedBy

		return res.status(200).json({ ...selectedPokemon, favoritedByCurrentUser })
	}
}
