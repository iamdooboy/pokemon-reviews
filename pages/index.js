import { Heading } from '@chakra-ui/react'
import PokemonContainer from '../components/pokemon-container'
import { getPokemonPage } from '../utils/axios'
import PokemonGrid from '../components/pokemon-grid'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const Page = () => {
	const router = useRouter()
	const {
		query: { numberOfPokemon = 151, offset = 0 }
	} = router

	const [data, setData] = useState([])

	useEffect(() => {
		const getData = async (numberOfPokemon, offset) => {
			const response = await getPokemonPage(numberOfPokemon, offset)
			setData(response)
		}

		getData(numberOfPokemon, offset)
	}, [router])

	return (
		<>
			<Heading as='h1' size='xl' align='center' py={4}>
				Pokemon Reviews
			</Heading>
			<Heading as='h1' size='md' align='center' py={4}>
				Nintendo has been creating a lot of questionable Pokemon. Luckily they
				are looking for your feedback.
			</Heading>
			{/* <PokemonContainer /> */}
			<PokemonGrid data={data} />
		</>
	)
}

// export async function getStaticProps(context) {
// 	const response = await getPokemonPage(151)

// 	return {
// 		props: {
// 			data: response
// 		}
// 	}
// }

// export const getServerSideProps = async context => {
// 	const response = await getPokemonPage(151)

// 	return {
// 		props: {
// 			data: response
// 		}
// 	}
// }

export default Page
