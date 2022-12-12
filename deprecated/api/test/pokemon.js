import { readFile } from 'fs/promises'

export default function handler(req, res) {
	res.status(200).json({ name: 'John Doe' })
}
