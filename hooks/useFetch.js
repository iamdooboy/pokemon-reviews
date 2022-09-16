import { useState, useEffect } from 'react'
import { getPokemonPage } from '../utils/axios'

const useFetch = (offset = 0) => {
	const [results, setResults] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const [isError, setIsError] = useState(false)
	const [error, setError] = useState({})
	const [hasNextPage, setHasNextPage] = useState(false)

	useEffect(() => {
		setIsLoading(true)
		setIsError(false)
		setError({})

		const controller = new AbortController()
		const { signal } = controller

		getPokemonPage(offset, { signal })
			.then(data => {
				setResults(prev => [...prev, ...data])
				setHasNextPage(Boolean(data.length))
				setIsLoading(false)
			})
			.catch(e => {
				setIsLoading(false)
				if (signal.aborted) {
					return
				}
				setIsError(true)
				setError({ message: e.message })
			})

		return () => controller.abort() //cancel request when the component unmount
	}, [offset])

	return { isLoading, isError, error, results, hasNextPage }
}

export default useFetch
