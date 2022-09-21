import React from 'react'
import Head from 'next/head'
import { Box, Container } from '@chakra-ui/react'
import NavBar from './navbar'

const Layout = ({ children }) => {
	return (
		<Box as='main' minHeight='100vh'>
			<Head>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<title>Pokemon Reviews</title>
			</Head>
			<NavBar />
			<Container maxW='7xl' pt={20} pb={4} position='relative'>
				{children}
			</Container>
		</Box>
	)
}

export default Layout
