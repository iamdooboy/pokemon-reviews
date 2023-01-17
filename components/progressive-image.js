import React from 'react'
import { Image } from '@chakra-ui/react'
import useProgressiveImg from '../hooks/useProgressiveImg'

export const ProgressImage = props => {
	const { lowQuality, highQuality, boxSize, alt } = props
	const [src, { blur }] = useProgressiveImg(lowQuality, highQuality)
	return (
		<Image
			src={src}
			filter={blur ? 'auto' : 'none'}
			blur={blur ? '20px' : 'none'}
			transition={blur ? 'none' : 'filter 0.3s ease-out'}
			boxSize={boxSize}
			alt={alt}
		/>
	)
}
