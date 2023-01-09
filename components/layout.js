import React from 'react'
import Head from 'next/head'
import { Box } from '@chakra-ui/react'
import Navbar from './navbar/navbar'

const Layout = ({ children }) => {
	return (
		<Box>
			<Head>
				<link rel='shortcut icon' href='/images/favicon.ico' />
				<link
					rel='apple-touch-icon'
					sizes='180x180'
					href='/images/apple-touch-icon.png'
				/>
				<link
					rel='icon'
					type='image/png'
					sizes='32x32'
					href='/images/favicon-32x32.png'
				/>
				<link
					rel='icon'
					type='image/png'
					sizes='16x16'
					href='/images/favicon-16x16.png'
				/>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<title>Pokemon Reviews</title>
			</Head>
			<Navbar />
			{children}
		</Box>
	)
}

export default Layout
