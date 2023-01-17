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
import { RepeatIcon } from '@chakra-ui/icons'

const NavSection = ({ id }) => {
	const router = useRouter()

	const { fetchAllPokemon } = usePokeAPI()

	const { data, isLoading } = fetchAllPokemon()

	const onClickHandler = () => {
		const random = getRandomPokemonNum()
		const gen = getPokemonGeneration(random)
		const name = data[random - 1]
		router.push(`/gen/${gen}/${name}`)
	}

	const prev = {
		id: id === 1 ? 1008 : id - 1,
		name: id === 1 ? data?.[1007] : data?.[id - 2],
		leftIcon: <ArrowBackIcon />,
		p: 0
	}

	const next = {
		id: id === 1008 ? 1 : id + 1,
		name: id === 1008 ? data?.[0] : data?.[id],
		rightIcon: <ArrowForwardIcon />,
		p: 0
	}

	return (
		<HStack align='center' justify='space-between' maxW='sm' w='full' h={12}>
			<NavButton
				{...prev}
				isLoading={isLoading}
				spinner={<PulseLoader color='#36d7b7' speedMultiplier={0.4} size={5} />}
			>
				{capitalFirstLetter(formatNames(prev.name))}
			</NavButton>
			<RandomButton
				leftIcon={<RepeatIcon />}
				w='full'
				size='md'
				onClick={onClickHandler}
				isLoading={isLoading}
				loadingText='Loading...'
				spinner={null}
			>
				Surprise me
			</RandomButton>
			<NavButton
				{...next}
				isLoading={isLoading}
				spinner={<PulseLoader color='#36d7b7' speedMultiplier={0.4} size={5} />}
			>
				{capitalFirstLetter(formatNames(next.name))}
			</NavButton>
		</HStack>
	)
}

export default NavSection
