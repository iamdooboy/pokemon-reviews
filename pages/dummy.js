// import React from 'react'
// import { prisma } from '../lib/prisma'
// import { getDummyPokemon } from '../utils/axios'
// import axios from 'axios'

const Dummy = () => {
	return <div>hello</div>
}

// export const getServerSideProps = async () => {
// 	// const allPokemon = await getDummyPokemon(0, 151)

// 	const pokemon = await axios
// 		.get('https://funny-elk-apron.cyclic.app/api/pokemon')
// 		.then(res => res.data.map(d => d.name))

// 	pokemon.map(async p => {
// 		await prisma.pokemon.create({
// 			data: {
// 				pokemon: p
// 			}
// 		})
// 		console.log(`done creating ${p}`)
// 	})
// 	return {
// 		props: {
// 			pokemon
// 		}
// 	}
// }
export default Dummy
