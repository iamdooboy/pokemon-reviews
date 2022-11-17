import { Box, Flex, Skeleton, Stack } from '@chakra-ui/react'

export const PokemonCardSkeleton = () => {
	return (
		<Box bg='gray.500' p='2px' rounded={8} maxW='xs' pos='relative' zIndex={-1}>
			<Stack maxW='xs' p={3} rounded={8} mx='auto'>
				<Skeleton h='19.2rem' w='100%' speed={3} />
				<Stack isInline align='center' marginBottom='5px'>
					<Box align='left' w='100%'>
						<Skeleton my={1} h='30px' w='100%' speed={3} />
						<Flex gap={3}>
							<Skeleton h='20px' w='35%' speed={3} />
							<Skeleton h='20px' w='35%' speed={3} />
						</Flex>
						<Skeleton my={1} h='20px' w='100%' speed={3} />
					</Box>
					<Box w='100%' align='right'>
						<Skeleton h='60px' w='50%' mt={5} speed={3} />
					</Box>
				</Stack>
			</Stack>
		</Box>
	)
}
