// function Repo({ pokemon }) {
// 	const { data, error } = useSWR(`/pokemon/${pokemon}/`)
// 	const { data: selected, error: selectedError } = useSWR(
// 		`/api/pokemon/${pokemon}/`
// 	)
// 	const { data: reviews } = useSWR(`/api/reviews/${pokemon}`)

// 	if (error) return 'An error has occurred.'
// 	//if (!data) return 'Loading...'
// 	if (!data || !selected || !reviews) return 'Loading...'
// 	return (
// 		<div>
// 			<img src={data.imageUrl} alt={data.imageAlt} />
// 			<h1>{data.name}</h1>
// 			<strong>✨ {data.id}</strong>
// 			<div>😃{selected.favorite}</div>
// 		</div>
// 	)
// }

// const Pokemon = ({ fallback, pokemon }) => {
// 	return (
// 		<SWRConfig value={{ fallback }}>
// 			<Repo pokemon={pokemon} />
// 		</SWRConfig>
// 	)
// }
