import useSWR from 'swr'

export const useNextAPI = (key, fetcher) => {
	const { data } = useSWR(key, fetcher)

	if (!data) return false

	return data
}
