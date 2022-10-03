import { useEffect, useState } from 'react'
import Image from 'next/image'
import { chakra } from '@chakra-ui/react'

const FallbackImage = ({ src, fallback, ...rest }) => {
	const [imgSrc, setImgSrc] = useState(src)

	useEffect(() => {
		setImgSrc(src)
	}, [src])

	return (
		<Image
			{...rest}
			src={imgSrc ? imgSrc : fallback}
			onError={() => {
				setImgSrc(fallback)
			}}
		/>
	)
}

export const FallbackAvatar = chakra(FallbackImage, {
	baseStyle: { borderRadius: 9999 },
	shouldForwardProp: prop =>
		['width', 'height', 'src', 'alt', 'fallback'].includes(prop)
})
