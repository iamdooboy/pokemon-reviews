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
