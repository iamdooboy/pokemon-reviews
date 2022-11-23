import { createContext, useContext, useState } from 'react'
import { useDisclosure } from '@chakra-ui/react'

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
	const [sortOrder, setSortOrder] = useState(0)
	const { isOpen, onClose, onOpen } = useDisclosure({ defaultIsOpen: true })
	return (
		<AppContext.Provider
			value={{ isOpen, onClose, onOpen, sortOrder, setSortOrder }}
		>
			{children}
		</AppContext.Provider>
	)
}

export const useAppContext = () => {
	return useContext(AppContext)
}
