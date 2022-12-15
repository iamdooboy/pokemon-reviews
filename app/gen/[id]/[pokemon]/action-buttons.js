'use client'

import { HStack, Button, useDisclosure, ButtonGroup } from '@chakra-ui/react'
import { MdFavoriteBorder, MdOutlineEdit, MdFavorite } from 'react-icons/md'
import { useState } from 'react'
import axios from 'axios'
import { useSession } from 'next-auth/react'

const ActionButtons = () => {
	const favoriteIcon = true ? (
		<MdFavorite color='#E53E3E' />
	) : (
		<MdFavoriteBorder />
	)
	return (
		<ButtonGroup variant='outline' maxW='sm' w='full' py={3}>
			<Button
				leftIcon={favoriteIcon}
				variant='outline'
				colorScheme='blue'
				w='20%'
			>
				1
			</Button>
			<Button
				variant='solid'
				loadingText='Leave a review'
				spinner={null}
				leftIcon={<MdOutlineEdit />}
				colorScheme='blue'
				w='80%'
			>
				Leave a review
			</Button>
		</ButtonGroup>
	)
}

export default ActionButtons
