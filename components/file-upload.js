import { Input, Button } from '@chakra-ui/react'
import { useRef } from 'react'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { nanoid } from 'nanoid'

export const FileUpload = ({ avatar, setAvatar }) => {
	const sizeLimit = 10 * 1024 * 1024 // 10MB
	const handleClick = () => {
		hiddenFileInput.current.click()
	}

	const handleChange = e => {
		const file = e.target.files[0]

		if (!file) return

		if (file.size > sizeLimit)
			return console.log('File size is exceeding 10MB.')

		const fileExt = file.name.split('.').pop()
		const fileName = `${nanoid()}.${fileExt}`

		setAvatar({ src: URL.createObjectURL(file), file, fileName })
	}

	const hiddenFileInput = useRef(null)

	return (
		<Button
			isLoading={avatar.isLoading}
			leftIcon={<AiOutlineCloudUpload />}
			onClick={handleClick}
			variant='ghost'
			loadingText='Uploading...'
		>
			<Input
				type='file'
				ref={hiddenFileInput}
				onChange={handleChange}
				display='none'
			/>
			Upload avatar
		</Button>
	)
}
