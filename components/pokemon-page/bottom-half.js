import React from 'react'
import { Flex, Text, Heading } from '@chakra-ui/react'

const Star = ({ fillColor }) => {
	return (
		<svg
			style={{
				width: '2rem',
				height: '2rem',
				fill: fillColor,
				marginRight: '0.25rem'
			}}
			viewBox='0 0 1000 1000'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path d='M972 380c9 28 2 50-20 67L725 619l87 280c11 39-18 75-54 75-12 0-23-4-33-12L499 790 273 962a58 58 0 0 1-78-12 50 50 0 0 1-8-51l86-278L46 447c-21-17-28-39-19-67 8-24 29-40 52-40h280l87-279c7-23 28-39 52-39 25 0 47 17 54 41l87 277h280c24 0 45 16 53 40z' />
		</svg>
	)
}

const BottomHalf = () => {
	return (
		<>
			<Heading
				as='h1'
				fontSize='3.5rem'
				fontWeight='400'
				lineHeight='4rem'
				py={2}
			>
				4.5
			</Heading>

			<Flex justifyContent='center'>
				{Array.from(Array(4).keys()).map(id => {
					return <Star key={id} fillColor='#FBBC05' />
				})}
				{Array.from(Array(5 - 4).keys()).map(id => {
					return <Star key={id} fillColor='#E8EAEE' />
				})}
			</Flex>

			<Text
				fontWeight='500'
				fontSize='1.2rem'
				lineHeight='1.25rem'
				my={5}
				color='gray.600'
			>
				1355 ratings
			</Text>
		</>
	)
}

export default BottomHalf
