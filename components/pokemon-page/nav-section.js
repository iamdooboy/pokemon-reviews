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
import { usePokeAPI } from '../../hooks/usePokeAPI'
import { PulseLoader } from 'react-spinners'

const NavSection = ({ pokemonName }) => {
	const router = useRouter()

	const [fetchOnePokemon, fetchAllPokemon] = usePokeAPI()

	const { data: one, isLoading: oneIsLoading } = fetchOnePokemon(pokemonName)

	const { data: allPokemon, isLoading: allIsLoading } = fetchAllPokemon('all')

	const onClickHandler = () => {
		const random = getRandomPokemonNum()
		const gen = getPokemonGeneration(random)
		const name = allPokemon[random - 1]
		router.push(`/gen/${gen}/${name}`)
	}

	const id = parseInt(one?.id)

	const prev = {
		id: id === 1 ? 905 : id - 1,
		name: id === 1 ? allPokemon?.[904] : allPokemon?.[id - 2],
		leftIcon: <ArrowBackIcon />
	}

	const next = {
		id: id === 905 ? 1 : id + 1,
		name: id === 905 ? allPokemon?.[0] : allPokemon?.[id],
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
			<NavButton
				{...prev}
				isLoading={allIsLoading || oneIsLoading}
				spinner={<PulseLoader color='#36d7b7' speedMultiplier={0.4} size={5} />}
			>
				{capitalFirstLetter(formatNames(prev.name))}
			</NavButton>
			<RandomButton
				w='full'
				size='sm'
				onClick={onClickHandler}
				isLoading={allIsLoading || oneIsLoading}
				loadingText='Loading...'
				spinner={null}
			>
				Surprise me
			</RandomButton>
			<NavButton
				{...next}
				isLoading={allIsLoading || oneIsLoading}
				spinner={<PulseLoader color='#36d7b7' speedMultiplier={0.4} size={5} />}
			>
				{capitalFirstLetter(formatNames(next.name))}
			</NavButton>
		</HStack>
	)
}

export default NavSection
