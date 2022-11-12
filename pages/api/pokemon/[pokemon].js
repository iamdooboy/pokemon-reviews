import { getSession } from 'next-auth/react'
import { prisma } from '../../../lib/prisma'

export default async function handler(req, res) {
	const session = await getSession({ req })

	if (!session) {
		return res.status(401).json({ message: 'Unauthorized.' })
	}

	const user = await prisma.user.findUnique({
		where: { email: session.user.email }
	})

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
	const favoritedByCurrentUser = selectedPokemon.favoritedBy.some(
		el => el.id === user.id
	)

	delete selectedPokemon.favoritedBy

	res.status(200).json({ ...selectedPokemon, favoritedByCurrentUser })
}
