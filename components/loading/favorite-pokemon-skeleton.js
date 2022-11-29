import {
	Box,
	Flex,
	Skeleton,
	Stack,
	SimpleGrid,
	GridItem
} from '@chakra-ui/react'

export const FavoritePokemonGridItemSkeleton = () => {
	return (
		<Box bg='gray.500' p='2px' rounded={8} maxW='xs' pos='relative' zIndex={-1}>
			<Stack maxW='xs' p={3} rounded={8} mx='auto'>
				<Skeleton h='150px' w='100%' speed={3} />
				<Stack isInline align='center' marginBottom='5px'>
					<Box align='left' w='100%'>
						<Skeleton my={1} h='20px' w='100%' speed={3} />
						<Flex gap={3}>
							<Skeleton my={1} h='20px' w='30%' speed={3} />
							<Skeleton my={1} h='20px' w='30%' speed={3} />
						</Flex>
					</Box>
				</Stack>
			</Stack>
		</Box>
	)
}

export const FavoritePokemonGridSkeleton = () => {
	return (
		<SimpleGrid columns={[2, 4, 4, 6]} spacing={4} py={4}>
			{[...Array(12)].map((_, index) => (
				<GridItem key={index}>
					<FavoritePokemonGridItemSkeleton />
				</GridItem>
			))}
		</SimpleGrid>
	)
}
