import Card from './card'
import Test from './test'

const fetchPokemon = async pokemon => {
	const res = await fetch(
		`https://funny-elk-apron.cyclic.app/api/pokemon/${pokemon}`
	)
	const data = await res.json()
	return data
}

export default async function Page({ params }) {
	const data = await fetchPokemon(params.pokemon)

	return (
		<>
			{/* <Card data={data} /> */}
			<Test data={data} />
		</>
	)
}
