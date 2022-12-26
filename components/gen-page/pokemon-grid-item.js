import { chakra, Box, GridItem, Text } from '@chakra-ui/react'
import { FallBackImage } from '../../utils/fallback-image'
import { CustomRating } from '../rating'
import { capitalFirstLetter, formatNames } from '../../utils/helpers'
import { m } from 'framer-motion'

const PokemonGridItem = ({ id, pokemonName, url, rating, count }) => {
	const formattedName = capitalFirstLetter(formatNames(pokemonName))
	const average = Math.round((rating / count) * 10) / 10
	return (
		<GridItem>
			<Box
				as={m.div}
				rounded={8}
				borderWidth='1px'
				shadow='lg'
				whileHover={{ scale: 1.1 }}
				transition='0.08s linear'
				_hover={{ borderColor: 'whiteAlpha.800', bg: 'gray.700' }}
			>
				<Text pr={1} align='right' color='gray.600'>
					{id}
				</Text>
				<Box align='center' pos='relative' zIndex={1}>
					<FallBackImage
						w='auto'
						h='auto'
						width='100px'
						height='100px'
						src={url}
						alt={pokemonName}
						fallbackSrc='/fallback.png'
						placeholder='blur'
						blurDataURL={url}
					/>
				</Box>
				<Box>
					<Text
						fontWeight='bold'
						as='h1'
						lineHeight='tight'
						noOfLines={1}
						align='center'
					>
						{formattedName}
					</Text>
					<Box justifyContent='center' align='center'>
						<chakra.div my={1} maxW={100}>
							<CustomRating value={count === 0 ? 0 : average} readOnly />
						</chakra.div>
						<Box color='gray.600' fontSize='sm' align='center' mb={2}>
							{count} ratings
						</Box>
					</Box>
				</Box>
			</Box>
		</GridItem>
	)
}

export default PokemonGridItem
