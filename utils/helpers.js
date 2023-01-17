export const getPokemonGeneration = id => {
	if (id <= 151) return 1

	if (id > 151 && id <= 251) return 2

	if (id > 251 && id <= 386) return 3

	if (id > 386 && id <= 493) return 4

	if (id > 493 && id <= 649) return 5

	if (id > 649 && id <= 721) return 6

	if (id > 721 && id <= 809) return 7

	if (id > 809 && id <= 905) return 8

	return 9
}

export const isNumber = input => {
	if (input === '') {
		return false
	}
	let regex = new RegExp(/[^0-9]/, 'g')
	return input.match(regex) === null
}

export const formatNames = name => {
	if (name === 'nidoran-f') return 'nidoran♀'
	if (name === 'nidoran-m') return 'nidoran♂'
	if (name === 'farfetchd') return 'farfetch&apos;d'
	if (name === 'mr-mime') return 'mr. Mime'
	if (name === 'ho-oh') return 'ho-Oh'
	if (name === 'mime-jr') return 'mime Jr.'
	if (name === 'porygon-z') return 'porygon-Z'
	if (name === 'flabebe') return 'flabébé'
	if (name === 'type-null') return 'type: Null'
	if (name === 'tapu-koko') return 'tapu Koko'
	if (name === 'tapu-lele') return 'tapu Lele'
	if (name === 'tapu-bulu') return 'tapu Bulu'
	if (name === 'tapu-fini') return 'tapu Fini'
	if (name === 'mr-rime') return 'mr. Rime'
	if (name === 'sirfetchd') return 'sirfetch&apos;d'
	if (name === 'tapu-bulu') return 'tapu Bulu'
	if (name === 'wo-chien') return 'wo-Chien'
	if (name === 'chien-pao') return 'chien-Pao'
	if (name === 'ting-lu') return 'ting-Lu'
	if (name === 'chi-yu') return 'chi-Yu'
	if (name === 'great-tusk') return 'great Tusk'
	if (name === 'scream-tail') return 'scream Tail'
	if (name === 'brute-bonnet') return 'brute Bonnet'
	if (name === 'flutter-mane') return 'flutter Mane'
	if (name === 'slither-wing') return 'slither Wing'
	if (name === 'sandy-shocks') return 'sandy Shocks'
	if (name === 'iron-treads') return 'iron Treads'
	if (name === 'iron-bundle') return 'iron Bundle'
	if (name === 'iron-hands') return 'iron Hands'
	if (name === 'iron-jugulis') return 'iron Jugulis'
	if (name === 'iron-moth') return 'iron Moth'
	if (name === 'iron-thorns') return 'iron Thorns'
	if (name === 'roaring-moon') return 'roaring Moon'
	if (name === 'iron-valiant') return 'iron Valiant'
	return name
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
	const paddedId = id.toString().padStart(4, '0')
	return `https://raw.githubusercontent.com/iamdooboy/pokemon-images/main/assets/images/${paddedId}.png`
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
	const max = Math.floor(1008)

	const random = Math.floor(Math.random() * (max - min + 1) + min) //inclusive min and max

	return random
}

export const splitEmail = email => {
	const arr = email.split('@')
	return arr[0]
}
