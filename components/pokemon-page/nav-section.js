import { HStack } from '@chakra-ui/react'
import NavButton from '../nav-button'
import RandomButton from '../random-button'
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import {
	formatNames,
	capitalFirstLetter,
	getRandomPokemonNum,
	getPokemonGeneration
} from '../../utils/helpers'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { api } from '../../utils/axios'
import { useFetchPokemon } from '../../hooks/useFetchPokemon'
import { usePokeAPI } from '../../hooks/usePokeAPI'

const NavSection = ({ pokemonName }) => {
	const router = useRouter()

	const [fetchOnePokemon, fetchAllPokemon] = usePokeAPI()

	const { data, isLoading: loading } = fetchOnePokemon(pokemonName)

	const { data: pokemon, isLoading } = fetchAllPokemon()

	if (isLoading || loading) return <div>loading</div>

	const onClickHandler = () => {
		const random = getRandomPokemonNum()
		const gen = getPokemonGeneration(random)
		const name = pokemon[random - 1]
		router.push(`/gen/${gen}/${name}`)
	}

	const id = parseInt(data.id)

	const prev = {
		id: id === 1 ? 905 : id - 1,
		name: id === 1 ? pokemon[904] : pokemon[id - 2],
		leftIcon: <ArrowBackIcon />
	}

	const next = {
		id: id === 905 ? 1 : id + 1,
		name: id === 905 ? pokemon[0] : pokemon[id],
		rightIcon: <ArrowForwardIcon />
	}

	return (
		<HStack
			align='center'
			justify='space-between'
			mt={5}
			mb={3}
			maxW='xs'
			w='full'
		>
			<NavButton {...prev}>
				{capitalFirstLetter(formatNames(prev.name))}
			</NavButton>
			<RandomButton w='full' size='sm' onClick={onClickHandler}>
				Surprise me
			</RandomButton>
			<NavButton {...next}>
				{capitalFirstLetter(formatNames(next.name))}
			</NavButton>
		</HStack>
	)
}

export default NavSection
