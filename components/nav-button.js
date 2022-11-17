import { Button } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { getPokemonGeneration } from '../utils/helpers'

const NavButton = ({ name, id, children, ...props }) => {
	const router = useRouter()

	const onClickHandler = () => {
		const gen = getPokemonGeneration(id)
		router.push(`/gen/${gen}/${name}`)
	}

	return (
		<Button
			{...props}
			colorScheme='gray'
			variant='ghost'
			w='full'
			size='xs'
			onClick={onClickHandler}
			_hover={{
				bg: 'transparent',
				color: 'gray.400',
				textDecoration: 'underline'
			}}
		>
			{children}
		</Button>
	)
}

export default NavButton
