import Link from 'next/link'

const fetchGen = async (gen) => {
    const res = await fetch(`https://funny-elk-apron.cyclic.app/api/gen/${gen}`)
    const data = await res.json()
    return data
}

export default async function Page({ params }) {

    const gen = params.id
    const data = await fetchGen(gen)

    return (
        <>
            {data.map(pokemon => (
                <p key={pokemon.name}>
                    <Link href={`/gen/${gen}/${pokemon.name}`}>{pokemon.name}</Link>
                </p>
            ))}
        </>
    )
}