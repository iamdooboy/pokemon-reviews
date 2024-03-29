import { Box, FormLabel, SimpleGrid, Flex, Text, Image } from '@chakra-ui/react'
import { FileUpload } from '../file-upload'

const AVATARS = [
	{ type: 'bug', src: '/avatar/bug.svg' },
	{ type: 'dark', src: '/avatar/dark.svg' },
	{ type: 'dragon', src: '/avatar/dragon.svg' },
	{ type: 'electric', src: '/avatar/electric.svg' },
	{ type: 'fairy', src: '/avatar/fairy.svg' },
	{ type: 'fighting', src: '/avatar/fighting.svg' },
	{ type: 'fire', src: '/avatar/fire.svg' },
	{ type: 'flying', src: '/avatar/flying.svg' },
	{ type: 'ghost', src: '/avatar/ghost.svg' },
	{ type: 'grass', src: '/avatar/grass.svg' },
	{ type: 'ground', src: '/avatar/ground.svg' },
	{ type: 'ice', src: '/avatar/ice.svg' },
	{ type: 'normal', src: '/avatar/normal.svg' },
	{ type: 'poison', src: '/avatar/poison.svg' },
	{ type: 'psychic', src: '/avatar/psychic.svg' },
	{ type: 'rock', src: '/avatar/rock.svg' },
	{ type: 'steel', src: '/avatar/steel.svg' },
	{ type: 'water', src: '/avatar/water.svg' }
]

const AvatarSelection = ({ avatar, setAvatar }) => {
	return (
		<>
			<FormLabel mt={5}>Avatar</FormLabel>
			<Flex align='center' justify='center'>
				<Image
					borderRadius='full'
					boxSize='90px'
					alt='avatar'
					src={avatar.src}
					my={3}
				/>
			</Flex>
			<FileUpload avatar={avatar} setAvatar={setAvatar} />
			<Text my={3} fontSize='xs' color='gray.400'>
				Or try these:
			</Text>
			<SimpleGrid columns={[2, 3, 3, 6]} spacing={6} py={4}>
				{AVATARS.map(a => (
					<Box
						align='center'
						justify='center'
						key={a.type}
						_hover={{ opacity: 0.5 }}
					>
						<Image
							onClick={() => setAvatar(a)}
							opacity={avatar.src === a.src ? 0.3 : 1}
							alt={a.type}
							src={a.src}
							width='40px'
							height='40px'
							cursor='pointer'
						/>
					</Box>
				))}
			</SimpleGrid>
		</>
	)
}

export default AvatarSelection
