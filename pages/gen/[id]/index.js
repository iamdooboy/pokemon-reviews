import { useEffect, useState, useRef } from 'react'
import PokemonGrid from '../../../components/gen-page/pokemon-grid'
import { getPokemonPage } from '../../../utils/axios'
import { Heading } from '@chakra-ui/react'

const GenerationPage = ({ id }) => {
	const [data, setData] = useState([])
	const log = useRef(true)

	useEffect(() => {
		const getData = async () => {
			const response = await getPokemonPage(id)
			setData(response)
		}
		if (log.current) {
			getData()
		}

		return () => (log.current = false)
	}, [id])

	return (
		<>
			<Heading as='h1' size='xl' align='center' py={4}>
				Pokemon Reviews
			</Heading>
			<Heading as='h1' size='md' align='center' py={4}>
				Nintendo has been creating a lot of questionable Pokemon. Luckily they
				are looking for your feedback.
			</Heading>

			<PokemonGrid data={data} />
		</>
	)
}

export const getServerSideProps = async context => {
	return {
		props: {
			id: context.query.id
		}
	}
}

export default GenerationPage
