import { Modal, ModalOverlay, ModalContent, ModalBody } from '@chakra-ui/react'
import CustomInput from '../custom-input'
import { useInput } from '../../hooks/useInput'
import { getPokemonGeneration } from '../../utils/helpers'
import CustomInputResults from '../custom-input-results'

const SearchModal = ({ isOpen, onClose }) => {
	const {
		pokemon,
		filteredList,
		activeIndex,
		setActiveIndex,
		onChangeHandler,
		onKeyDownHandler,
		onCloseHandler
	} = useInput(onClose)

	return (
		<>
			<Modal
				scrollBehavior='inside'
				onClose={onCloseHandler}
				isOpen={isOpen}
				size={{ base: 'xs', md: 'md' }}
			>
				<ModalOverlay backdropFilter='blur(2px)' />
				<ModalContent maxHeight='30rem'>
					<ModalBody m={2} px={3}>
						<CustomInput
							boxSize={5}
							pl={3}
							size='lg'
							bg='gray.700'
							rounded='md'
							onChange={onChangeHandler}
							onKeyDown={onKeyDownHandler}
						/>
						{filteredList.map((pkmn, index) => {
							const pokemonId = pokemon.indexOf(pkmn) + 1
							const gen = getPokemonGeneration(pokemonId)
							return (
								<CustomInputResults
									gen={gen}
									activeIndex={activeIndex}
									setActiveIndex={setActiveIndex}
									key={pkmn}
									pokemon={pkmn}
									onClose={onCloseHandler}
									index={index}
								/>
							)
						})}
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	)
}

export default SearchModal
