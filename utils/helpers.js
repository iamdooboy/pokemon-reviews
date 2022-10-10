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
