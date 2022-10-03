import React from 'react'
import Head from 'next/head'
import { Flex, chakra, Box } from '@chakra-ui/react'
import Navbar from './navbar/navbar'
import Sidebar from './sidebar/sidebar'

const Layout = ({ children }) => {
	return (
		<Box>
			<Head>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<title>Pokemon Reviews</title>
			</Head>
			<Navbar />
			<Flex as='main' className='main-content'>
				<Sidebar />

				<chakra.div
					flex={1}
					px='5'
					overflow='auto'
					maxH='calc(100vh - var(--chakra-sizes-16))' //viewheight - navbar height
				>
					{children}
				</chakra.div>
			</Flex>
		</Box>
	)
}
export default Layout
