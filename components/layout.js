import React from 'react'
import Head from 'next/head'
import { Flex, chakra } from '@chakra-ui/react'
import Navbar from './navbar'
import Sidebar from './sidebar'

const Layout = ({ children }) => {
	return (
		<React.Fragment>
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
					maxH='calc(100vh - var(--chakra-sizes-16))'
				>
					{children}
				</chakra.div>
			</Flex>
		</React.Fragment>
	)
}
export default Layout
