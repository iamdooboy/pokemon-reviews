import React from 'react'
import { useNextAPI } from '../hooks/useNextAPI'
import axios from 'axios'

const test = () => {
	const fetcher = url =>
		axios.get(url, { params: { pokemon: 'bulbasaur' } }).then(res => res.data)
	const data = useNextAPI(`/api/reviews/bulbasaur`, fetcher)

	console.log(data)
}

export default test
