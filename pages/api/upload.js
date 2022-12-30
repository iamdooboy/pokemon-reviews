import { supabase } from '../../lib/supabase'
import { nanoid } from 'nanoid'

export default async function handler(req, res) {
	console.log(req.body)
	// try {

	// } catch (error) {

	// }
	// console.log(image)
	// const fileName = nanoid()
	// let { error: uploadError } = supabase.storage
	// 	.from(process.env.SUPABASE_BUCKET)
	// 	.upload(fileName + '.jpg', image)

	// const contentType = image.match(/data:(.*);base64/)?.[1]
	// const base64FileData = image.split('base64,')?.[1]
	// const fileName = nanoid()
	// const ext = contentType.split('/')[1]
	// const path = `${fileName}.${ext}`
	// console.log(contentType)
	// Upload image to Supabase
	// if (req.method === 'POST') {
	// 	let { image } = req.body

	// 	if (!image) {
	// 		return res.status(500).json({ message: 'No image provided' })
	// 	}
	// 	try {
	// 		const contentType = image.match(/data:(.*);base64/)?.[1]
	// 		const base64FileData = image.split('base64,')?.[1]
	// 		if (!contentType || !base64FileData) {
	// 			return res.status(500).json({ message: 'Image data not valid' })
	// 		}
	// 		const fileName = nanoid()
	// 		const ext = contentType.split('/')[1]
	// 		const path = `${fileName}.${ext}`

	// 		const { data, error: uploadError } = await supabase.storage
	// 			.from(process.env.SUPABASE_BUCKET)
	// 			.upload(path, decode(base64FileData), {
	// 				contentType,
	// 				upsert: true
	// 			})

	// 		if (uploadError) {
	// 			console.log(uploadError)
	// 			throw new Error('Unable to upload image to storage')
	// 		}

	// 		// const test = `${process.env.SUPABASE_URL}/storage/v1/object/sign/${process.env.SUPABASE_BUCKET}/${data.Key}`
	// 		// const url = `${process.env.SUPABASE_URL.replace(
	// 		// 	'.co',
	// 		// 	'.in'
	// 		// )}/storage/v1/object/sign/${data.Key}`
	// 		// console.log()

	// 		return res.status(200).json({ url })
	// 	} catch (error) {
	// 		console.log(error)
	// 		res.status(500).json({ message: 'Something went wrong' })
	// 	}
	// }
	// // HTTP method not supported!
	// // else {
	// // 	res.setHeader('Allow', ['POST'])
	// // 	res
	// // 		.status(405)
	// // 		.json({ message: `HTTP method ${req.method} is not supported.` })
	// // }
}
