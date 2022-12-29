// import React from 'react'
// import { prisma } from '../lib/prisma'
// import axios from 'axios'
import { FileUpload } from '../components/file-upload'

const Dummy = () => {
	return <FileUpload />
}

// export const getServerSideProps = async () => {
// 	let timesRun = 0
// 	let interval = setInterval(async () => {
// 		timesRun += 1
// 		const pokemon = await axios
// 			.get(`https://funny-elk-apron.cyclic.app/api/gen/${timesRun}`)
// 			.then(res => res.data)
// 		pokemon.map(async p => {
// 			await prisma.pokemon.create({
// 				data: {
// 					pokemon: p.name,
// 					dexId: parseInt(p.id),
// 					gen: timesRun
// 				}
// 			})
// 			console.log(`done creating ${p.name}`)
// 		})
// 		if (timesRun === 8) {
// 			console.log('complete')
// 			clearInterval(interval)
// 		}
// 	}, 5000)

// 	return {
// 		props: {
// 			pokemon: null
// 		}
// 	}
// }
export default Dummy
