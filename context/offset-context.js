import React, { createContext, useState } from 'react'

export const OffsetContext = createContext()

export const OffsetProvider = ({ children }) => {
	const [offset, setOffset] = useState(0)
	return (
		<OffsetContext.Provider value={{ offset, setOffset }}>
			{children}
		</OffsetContext.Provider>
	)
}
