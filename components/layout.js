import React from 'react'
import Head from 'next/head'
import { Box } from '@chakra-ui/react'
import Navbar from './navbar/navbar'

const Layout = ({ children }) => {
	return (
		<Box>
			<Head>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<title>Pokemon Reviews</title>
			</Head>
			<Navbar />
			{children}
		</Box>
	)
}
export default Layout
