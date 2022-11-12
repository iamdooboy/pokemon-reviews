import useSWR from 'swr'
import axios from 'axios'

export const useFetchReviews = (key, fetcher) => {
	const { data, mutate } = useSWR(key, fetcher)

	const calcRatings = review => {
		const reviewCount = review.length

		const totalRating = review
			? review.reduce((sum, obj) => sum + obj.rating, 0)
			: 0

		let averageRating = totalRating ? totalRating / reviewCount : 0

		averageRating = Math.round(averageRating * 10) / 10

		return {
			count: reviewCount,
			rating: averageRating
		}
	}

	const updateFn = async newData => {
		const res = await axios
			.put('/api/reviews/like', newData)
			.then(res => res.data)

		const updatedData = data.map(review => {
			if (review.id !== res.id) {
				return review
			}
			return {
				...res
			}
		})

		return updatedData
	}

	const like = selected => {
		const { id, favorite, favoritedByCurrentUser } = selected

		const newData = {
			id,
			favorite: favoritedByCurrentUser ? favorite - 1 : favorite + 1,
			favoritedByCurrentUser: !favoritedByCurrentUser
		}

		const optimisticData = data.map(review => {
			if (id !== review.id) {
				return review
			}
			return {
				...review,
				favorite: favoritedByCurrentUser ? favorite - 1 : favorite + 1,
				favoritedByCurrentUser: !favoritedByCurrentUser
			}
		})

		const options = {
			optimisticData,
			rollbackOnError: true,
			populateCache: true,
			revalidate: false
		}

		mutate(updateFn(newData), options)
	}

	return {
		reviews: data,
		isLoading: !data,
		calcRatings,
		like
	}

	// if (!data) return data

	// const reviewCount = data.length

	// const totalRating = data ? data.reduce((sum, obj) => sum + obj.rating, 0) : 0

	// let averageRating = totalRating ? totalRating / reviewCount : 0

	// averageRating = Math.round(averageRating * 10) / 10

	// return {
	// 	count: reviewCount,
	// 	rating: averageRating
	// }
}

// export const useFetchReviews = (pokemonName, fetchOneReview = true) => {
// 	if (fetchOneReview) {
// 		const fetcher = url =>
// 			axios.get(url, { params: { pokemon: pokemonName } }).then(res => res.data)

// 		const { data } = useSWR(`/api/reviews/${pokemonName}`, fetcher)

// 		//if (!data) return false

// 		const reviewCount = data?.length

// 		const totalRating = data
// 			? data.reduce((sum, obj) => sum + obj.rating, 0)
// 			: 0

// 		let averageRating = totalRating ? totalRating / reviewCount : 0

// 		averageRating = Math.round(averageRating * 10) / 10

// 		return {
// 			count: reviewCount,
// 			rating: averageRating
// 		}
// 	} else {
// 		return {
// 			count: 1,
// 			rating: 2
// 		}
// 	}
// }
