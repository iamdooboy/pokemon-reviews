import React from 'react'
import CreateDummyData from '../components/create-dummy-data'
//import prisma from '../lib/prisma'
import { getDummyPokemon } from '../utils/axios'

const Dummy = ({ allPokemon }) => {
	return <CreateDummyData />
}

export const getServerSideProps = async context => {
	const allPokemon = await getDummyPokemon(800, 60)

	allPokemon.map(async pokemon => {
		await prisma.pokemon.create({
			data: {
				pokemon: pokemon,
				favoritedBy: {}
			}
		})
	})
	return {
		props: {
			allPokemon
		}
	}
}
export default Dummy