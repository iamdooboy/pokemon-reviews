import useSWR from 'swr'

export const useFetchReviews = (key, fetcher) => {
	const { data } = useSWR(key, fetcher)

	if (!data) return false

	const reviewCount = data.length

	const totalRating = data ? data.reduce((sum, obj) => sum + obj.rating, 0) : 0

	let averageRating = totalRating ? totalRating / reviewCount : 0

	averageRating = Math.round(averageRating * 10) / 10

	return {
		count: reviewCount,
		rating: averageRating
	}
}
