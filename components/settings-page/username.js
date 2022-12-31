import { FormLabel, Input } from '@chakra-ui/react'

const Username = ({ name, setName }) => {
	return (
		<>
			<FormLabel>Username</FormLabel>
			<Input type='text' value={name} onChange={e => setName(e.target.value)} />
		</>
	)
}

export default Username
