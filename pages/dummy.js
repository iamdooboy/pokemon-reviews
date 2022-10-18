import React from 'react'
// import CreateDummyData from '../components/create-dummy-data'
// import { prisma } from '../lib/prisma'
import { getDummyPokemon } from '../utils/axios'
//import Sidebar from '../components/sidebar'

const Dummy = () => {
	return <div>hello</div>
}

// export const getServerSideProps = async () => {
// 	const allPokemon = await getDummyPokemon(105, 800)

// 	allPokemon.map(async pokemon => {
// 		await prisma.pokemon.create({
// 			data: {
// 				pokemon: pokemon
// 			}
// 		})
// 	})
// 	return {
// 		props: {
// 			allPokemon
// 		}
// 	}
// }
export default Dummy
