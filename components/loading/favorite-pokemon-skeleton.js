import React from 'react'
import {
	Box,
	Flex,
	Skeleton,
	Stack,
	SimpleGrid,
	GridItem
} from '@chakra-ui/react'

export const FavoritePokemonGridSkeleton = () => {
	return (
		<SimpleGrid columns={[2, 4, 4, 6]} spacing={4} py={4}>
			{[...Array(6)].map((_, index) => (
				<GridItem key={index}>
					<Box
						bg='gray.500'
						p='2px'
						rounded={8}
						maxW='xs'
						pos='relative'
						zIndex={-1}
					>
						<Stack maxW='xs' p={3} rounded={8} mx='auto'>
							<Skeleton h='150px' w='100%' />
							<Stack isInline align='center' marginBottom='5px'>
								<Box align='left' w='100%'>
									<Skeleton my={1} h='30px' w='100%' />
									<Flex gap={3}>
										<Skeleton h='20px' w='35%' />
										<Skeleton h='20px' w='35%' />
									</Flex>
									<Skeleton my={1} h='20px' w='100%' />
								</Box>
								<Box w='100%' align='right'>
									<Skeleton h='60px' w='50%' mt={5} />
								</Box>
							</Stack>
						</Stack>
					</Box>
				</GridItem>
			))}
		</SimpleGrid>
	)
}
