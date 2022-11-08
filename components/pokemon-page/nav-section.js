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

const NavSection = ({ pokemonName }) => {
	const router = useRouter()
	const { data } = useSWR(`/pokemon/${pokemonName}`)

	const id = data?.id

	const { data: pokemon } = useSWR('/pokemon?limit=905', () =>
		api
			.get('/pokemon?limit=905&offset=0')
			.then(res => res.data.results.map(el => el.name))
	)

	const onClickHandler = () => {
		const random = getRandomPokemonNum()
		const gen = getPokemonGeneration(random)
		const name = pokemon[random - 1]
		router.push(`/gen/${gen}/${name}`)
	}

	if (pokemon) {
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
					id={id === 1 ? 905 : id - 1}
					name={id === 1 ? pokemon[904] : pokemon[id - 2]}
					leftIcon={<ArrowBackIcon />}
				>
					{id === 1
						? capitalFirstLetter(formatNames(pokemon[904]))
						: capitalFirstLetter(formatNames(pokemon[id - 2]))}
				</NavButton>

				<RandomButton w='full' size='sm' onClick={onClickHandler}>
					Surprise me
				</RandomButton>

				<NavButton
					id={id === 905 ? 1 : id + 1}
					name={id === 905 ? pokemon[0] : pokemon[id]}
					rightIcon={<ArrowForwardIcon />}
				>
					{id === 905
						? capitalFirstLetter(formatNames(pokemon[0]))
						: capitalFirstLetter(formatNames(pokemon[id]))}
				</NavButton>
			</HStack>
		)
	}
}

export default NavSection
