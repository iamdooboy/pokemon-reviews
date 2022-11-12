export const getPokemonGeneration = id => {
	if (id <= 151) {
		return 1
	} else if (id > 151 && id <= 251) {
		return 2
	} else if (id > 251 && id <= 386) {
		return 3
	} else if (id > 386 && id <= 493) {
		return 4
	} else if (id > 493 && id <= 649) {
		return 5
	} else if (id > 649 && id <= 721) {
		return 6
	} else if (id > 721 && id <= 809) {
		return 7
	} else if (id > 809 && id <= 905) {
		return 8
	}
}

export const isNumber = input => {
	if (input === '') {
		return false
	}
	let regex = new RegExp(/[^0-9]/, 'g')
	return input.match(regex) === null
}

export const formatNames = name => {
	if (!name?.includes('-')) {
		return name
	}
	switch (name) {
		case 'nidoran-f':
			return 'nidoran♀'
		case 'nidoran-m':
			return 'nidoran♂'
		case 'mr-mime':
			return 'mr. Mime'
		case 'ho-oh':
			return 'ho-Oh'
		case 'mime-jr':
			return 'mime Jr.'
		case 'porygon-z':
			return 'Porygon-Z'
		case 'type-null':
			return 'type: Null'
		case 'jangmo-o':
			return 'jangmo-o'
		case 'hakamo-o':
			return 'hakamo-o'
		case 'kommo-o':
			return 'kommo-o'
		case 'tapu-koko':
			return 'tapu Koko'
		case 'tapu-lele':
			return 'tapu Lele'
		case 'tapu-bulu':
			return 'tapu Bulu'
		case 'tapu-fini':
			return 'tapu Fini'
		case 'mr-rime':
			return 'mr. Rime'
		default:
			return name.substring(0, name.indexOf('-'))
	}
}

export const capitalFirstLetter = str => {
	const firstLetter = str?.charAt(0).toUpperCase()
	const restOfString = str?.slice(1)
	return firstLetter + restOfString
}

export const getPokemonImageUrl = id => {
	if (id === 0) {
		return
	}
	const paddedId = id.toString().padStart(3, '0')
	return `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedId}.png`
}
export const timeOffset = time => {
	const createdAt = new Date(time)
	const now = new Date()
	const offset = now - createdAt
	const minutes = Math.floor(offset / 1000 / 60)

	if (minutes < 1) {
		return 'a moment ago'
	}

	if (minutes === 1) {
		return 'a minute ago'
	}

	if (minutes < 60) {
		return `${minutes} minutes ago`
	}

	const hours = Math.floor(minutes / 60)

	if (hours === 1) {
		return 'an hour ago'
	}

	if (hours < 24) {
		return `${hours} hours ago`
	}

	const days = Math.floor(hours / 24)

	const numOfDaysInMonth = new Date(
		now.getFullYear(),
		now.getMonth(),
		0
	).getDate()

	if (days === 1) {
		return 'a day ago'
	}

	if (days < numOfDaysInMonth) {
		return `${days} days ago`
	}

	const months = days / numOfDaysInMonth

	if (months === 1) {
		return 'a month ago'
	}

	if (months < 12) {
		return `${months} months ago`
	}

	const years = months / 12

	if (years === 1) {
		return 'a year ago'
	}

	return `${years} year ago`
}

export const getRandomPokemonNum = () => {
	const min = Math.ceil(1)
	const max = Math.floor(905)

	const random = Math.floor(Math.random() * (max - min + 1) + min) //inclusive min and max

	return random
}

export const splitEmail = email => {
	const arr = email.split('@')
	return arr[0]
}

export const getLimitAndOffset = gen => {
	if (gen === 1) {
		return { limit: 151, offset: 0, gen: 1 }
	} else if (gen === 2) {
		return { limit: 100, offset: 151, gen: 2 }
	} else if (gen === 3) {
		return { limit: 135, offset: 251, gen: 3 }
	} else if (gen === 4) {
		return { limit: 107, offset: 386, gen: 4 }
	} else if (gen === 5) {
		return { limit: 156, offset: 493, gen: 5 }
	} else if (gen === 6) {
		return { limit: 72, offset: 649, gen: 6 }
	} else if (gen === 7) {
		return { limit: 88, offset: 721, gen: 7 }
	} else if (gen === 8) {
		return { limit: 96, offset: 809, gen: 8 }
	} else {
		return { limit: 905, offset: 0 }
	}
}
