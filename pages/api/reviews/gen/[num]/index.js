import { prisma } from '../../../../../lib/prisma'

export default async function handler(req, res) {
	const num = parseInt(req.query.num)
	let reviews = await prisma.review.findMany({
		where: {
			gen: num
		},
		orderBy: {
			dexId: 'asc'
		}
	})

	const flat = {}

	reviews.forEach(obj => {
		if (flat[obj.pokemon]) {
			flat[obj.pokemon].rating += obj.rating
			flat[obj.pokemon].count++
		} else {
			flat[obj.pokemon] = {
				dexId: obj.dexId,
				pokemon: obj.pokemon,
				rating: obj.rating,
				count: 1
			}
		}
	})

	//const summary = Object.values(flat)

	res.status(200).json(flat)
}
