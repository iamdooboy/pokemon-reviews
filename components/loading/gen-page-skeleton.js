import React from 'react'
import { Box, Skeleton, Stack, SimpleGrid, GridItem } from '@chakra-ui/react'

export const GridItemSkeleton = () => {
	return (
		<Box bg='gray.500' p='2px' rounded={8} maxW='xs' pos='relative' zIndex={-1}>
			<Stack maxW='xs' p={5} rounded={8} mx='auto'>
				<Skeleton h='110px' w='100%' />
				<Stack align='center'>
					<Box align='center' w='100%'>
						<Skeleton my={1} h='20px' w='100%' />
						<Skeleton my={1} h='20px' w='90%' />
					</Box>
				</Stack>
			</Stack>
		</Box>
	)
}

export const GenPageSkeleton = () => {
	return (
		<SimpleGrid columns={[2, 3, 3, 6]} spacing={6} py={4}>
			{[...Array(18)].map((_, index) => (
				<GridItem key={index}>
					<GridItemSkeleton />
				</GridItem>
			))}
		</SimpleGrid>
	)
}
