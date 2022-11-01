import React from 'react'
import { Rating, ThinRoundedStar } from '@smastrom/react-rating'
import { chakra } from '@chakra-ui/react'

const customStyles = {
	itemShapes: ThinRoundedStar,
	activeFillColor: '#f59e0b',
	inactiveFillColor: '#808080'
}

const rating = ({ ...rest }) => {
	return <Rating {...rest} itemStyles={customStyles} />
}

export const CustomRating = chakra(rating, {
	shouldForwardProp: prop =>
		['style', 'value', 'readOnly', 'spaceBetween', 'onChange'].includes(prop)
})
