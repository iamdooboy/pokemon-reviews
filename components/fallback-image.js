import { useEffect, useState } from 'react'
import Image from 'next/image'

const FallbackImage = ({ src, ...rest }) => {
	const [imgSrc, setImgSrc] = useState(src)

	useEffect(() => {
		setImgSrc(src)
	}, [src])

	return (
		<Image
			{...rest}
			src={imgSrc ? imgSrc : '/bug.svg'}
			onError={() => {
				setImgSrc('/bug.svg')
			}}
		/>
	)
}

export default FallbackImage
