import Link from 'next/link'
import PokemonGrid from './pokemon-grid'

const fetchGen = async gen => {
	const res = await fetch(`https://funny-elk-apron.cyclic.app/api/gen/${gen}`)

	const data = await res.json()
	return data
}

export default async function Page({ params }) {
	const gen = parseInt(params.id)
	// const data = await fetchGen(gen)
	return (
		// <div>hello</div>
		// <>
		// 	<div>gen {gen}</div>
		// 	{data.map(pokemon => (
		// 		<p key={pokemon.name}>
		// 			<Link href={`/gen/${gen}/${pokemon.name}`}>{pokemon.name}</Link>
		// 		</p>
		// 	))}
		// </>
		<PokemonGrid gen={gen} />
	)
}
