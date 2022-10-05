import { useEffect, useState, useRef } from 'react'
import PokemonGrid from '../../../components/gen-page/pokemon-grid'
import { getPokemonGenPage } from '../../../utils/axios'
import { Heading } from '@chakra-ui/react'

const GenerationPage = ({ id }) => {
	const [data, setData] = useState([])
	const log = useRef(true)

	useEffect(() => {
		const getData = async () => {
			const response = await getPokemonGenPage(id)
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
	const isNumber = input => {
		if (input === '') {
			return false
		}
		let regex = new RegExp(/[^0-9]/, 'g')
		return input.match(regex) === null
	}

	if (!isNumber(context.query.id)) {
		return {
			notFound: true
		}
	}

	const id = parseInt(context.query.id)
	if (id <= 0 || id >= 9) {
		return {
			notFound: true
		}
	}

	return {
		props: {
			id: context.query.id
		}
	}
}

export default GenerationPage
