import React from 'react'
import { Box, Skeleton, Stack, SimpleGrid, GridItem } from '@chakra-ui/react'

export const ReviewBoxSkeleton = () => {
	return (
		<Box
			maxW='xs'
			rounded={8}
			borderWidth={1}
			align='center'
			mt={3}
			mx='auto'
			p={3}
			bg='gray.500'
		>
			<Stack isInline align='center'>
				<Box>
					<Skeleton
						size='sm'
						width='2em'
						height='2em'
						borderRadius='50%'
						speed={3}
					/>
				</Box>
				<Skeleton height='14px' width='40%' speed={3} />
			</Stack>
			<Box pl='2.5em' align='left'>
				<Skeleton my={2} height='16px' width='100%' speed={3} />
				<Skeleton my={2} height='14px' width='100%' speed={3} />
			</Box>
		</Box>
	)
}

export const ReviewGridSkeleton = () => {
	return (
		<SimpleGrid columns={[1, 2, 2, 3]} spacing={4} py={4}>
			{[...Array(9)].map((_, index) => (
				<GridItem key={index}>
					<Box
						rounded={8}
						p={3}
						h='full'
						maxHeight='200px'
						overflow='auto'
						bg='gray.500'
					>
						<Stack direction='column' maxW='2xl'>
							<Stack isInline align='center'>
								<Box>
									<Skeleton
										size='sm'
										width='2em'
										height='2em'
										borderRadius='50%'
										speed={3}
									/>
								</Box>
								<Box w='full'>
									<Skeleton height='14px' width='30%' mb={4} speed={3} />
									<Skeleton height='14px' width='30%' speed={3} />
								</Box>
							</Stack>
							<Box pl='2.5em' align='left'>
								<Skeleton my={4} height='16px' width='50%' speed={3} />
								<Skeleton my={4} height='16px' width='100%' speed={3} />
								<Skeleton my={4} height='16px' width='100%' speed={3} />
							</Box>
						</Stack>
					</Box>
				</GridItem>
			))}
		</SimpleGrid>
	)
}
