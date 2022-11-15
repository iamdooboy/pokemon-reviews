import { createContext, useContext } from 'react'
import { useDisclosure } from '@chakra-ui/react'

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
	const { isOpen, onClose, onOpen } = useDisclosure({ defaultIsOpen: true })
	return (
		<AppContext.Provider value={{ isOpen, onClose, onOpen }}>
			{children}
		</AppContext.Provider>
	)
}

export const useAppContext = () => {
	return useContext(AppContext)
}
