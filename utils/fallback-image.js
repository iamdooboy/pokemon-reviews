import { useEffect, useState } from 'react'
import Image from 'next/image'
import { chakra } from '@chakra-ui/react'

const NextFallBack = ({ src, fallback, ...rest }) => {
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

export const FallBackImage = chakra(NextFallBack, {
	shouldForwardProp: prop =>
		[
			'blurDataURL',
			'placeholder',
			'layout',
			'width',
			'height',
			'src',
			'alt',
			'fallback'
		].includes(prop)
})
