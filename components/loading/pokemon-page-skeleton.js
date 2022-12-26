import {
	SimpleGrid,
	Box,
	Flex,
	Skeleton,
	HStack,
	Button,
	Card,
	CardBody,
	Tabs,
	Tab,
	TabList,
	Container
} from '@chakra-ui/react'
import { useState } from 'react'
import { PulseLoader } from 'react-spinners'
import { ReviewBoxSkeleton } from './review-box-skeleton'

const PokemonCardSkeleton = () => {
	return (
		<Card maxW='sm' bg='gray.500' p='2px' mt={3}>
			<CardBody p={3}>
				<Skeleton h='22rem' w='100%' speed={3} />
				<Box>
					<Flex justify='space-between' w='full' align='center' mt={2}>
						<Skeleton my={1} h='30px' w='50%' speed={3} />
						<Skeleton my={1} h='30px' w='20%' speed={3} />
					</Flex>
					<Flex w='full' align='center'>
						<Box w='50%'>
							<Flex justify='start' w='full' align='center' gap={2}>
								<Skeleton my={1} h='20px' w='40%' speed={3} />
								<Skeleton my={1} h='20px' w='40%' speed={3} />
							</Flex>
							<Skeleton my={1} h='30px' w='100%' speed={3} />
						</Box>
						<Box w='50%'>
							<Flex justify='flex-end'>
								<Skeleton my={1} h='60px' w='50%' speed={3} />
							</Flex>
						</Box>
					</Flex>
				</Box>
			</CardBody>
		</Card>
	)
}

const NavSectionSkeleton = () => {
	return (
		<HStack align='center' justify='space-between' maxW='sm' w='full' h={12}>
			<Button
				isLoading
				spinner={<PulseLoader color='#718196' speedMultiplier={0.4} size={5} />}
				variant='ghost'
				w='full'
				size='xs'
			/>
			<Button
				bg='#718196'
				fontSize={{ base: 'xs', md: 'md', lg: 'md' }}
				w='full'
				size='md'
				isLoading
				loadingText='Loading...'
				spinner={null}
				_hover={{
					bg: '#718196'
				}}
			/>
			<Button
				isLoading
				spinner={<PulseLoader color='#718196' speedMultiplier={0.4} size={5} />}
				variant='ghost'
				w='full'
				size='xs'
			/>
		</HStack>
	)
}

const ActionButtonsSkeleton = () => {
	return (
		<HStack align='center' justify='center' maxW='sm' mt={3} h={12}>
			<Button
				isLoading
				variant='outline'
				w='20%'
				bg='#718196'
				_hover={{
					bg: '#718196'
				}}
			/>
			<Button
				isLoading
				loadingText='Leave a review'
				spinner={null}
				w='80%'
				bg='#718196'
				_hover={{
					bg: '#718196'
				}}
			/>
		</HStack>
	)
}

const SortSectionSkeleton = () => {
	const [_, setSortOrder] = useState(0)
	const TABS = ['Latest', 'Popular']
	return (
		<HStack align='center' justify='space-between' maxW='sm' h={12} mb={3}>
			<Button
				isLoading
				variant='outline'
				w='20%'
				bg='#718196'
				_hover={{
					bg: '#718196'
				}}
			/>
			<Tabs
				align='end'
				variant='unstyled'
				onChange={index => {
					setSortOrder(index)
				}}
			>
				<TabList>
					{TABS.map(tab => (
						<Tab
							key={tab}
							id={tab}
							aria-controls={tab}
							_selected={{
								outline: '1px solid #3A404B',
								outlineOffset: 0,
								bg: 'rgba(17, 25, 40, 0.75)',
								rounded: 'md'
							}}
						>
							{tab}
						</Tab>
					))}
				</TabList>
			</Tabs>
		</HStack>
	)
}

export const PokemonPageSkeleton = () => {
	return (
		<Container
			maxW='container.lg'
			px={{ base: 5, md: 12 }}
			margin='0 auto'
			pt={16}
			maxH='calc(100vh - var(--chakra-sizes-16))' //viewheight - navbar height
		>
			<SimpleGrid
				columns={[1, null, 2]}
				spacing={0}
				h='full'
				maxH='calc(100vh - var(--chakra-sizes-16))'
			>
				<Box align='center' mt={3}>
					<NavSectionSkeleton />
					<PokemonCardSkeleton />
					<ActionButtonsSkeleton />
				</Box>
				<Box align='center' mt={3}>
					<SortSectionSkeleton />
					<ReviewBoxSkeleton />
					<ReviewBoxSkeleton />
				</Box>
			</SimpleGrid>
		</Container>
	)
}
