import PokemonGrid from './pokemon-grid'

export default async function Page({ params }) {
	const gen = parseInt(params.id)

	return <PokemonGrid gen={gen} />
}
