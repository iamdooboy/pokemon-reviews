import { getSession } from 'next-auth/react'
import prisma from '../../lib/prisma'

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
			const { fav, pokemonId, toggle } = req.body

			const toggleFunction = !toggle
				? {
						connect: {
							id: user.id
						}
				  }
				: {
						disconnect: {
							id: user.id
						}
				  }

			const savedPokemon = await prisma.pokemon.update({
				where: {
					id: pokemonId
				},
				data: {
					favorite: fav,
					favoritedBy: {
						...toggleFunction
					}
				},
				select: { id: true, pokemon: true, favoritedBy: true }
			})
			console.dir(savedPokemon, { depth: null })
			res.status(200).json(savedPokemon)
		} catch (e) {
			console.log(e)
			res.status(500).json({ message: 'Something went wrong' })
		}
	}
}
