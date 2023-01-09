import { Input, Button, useToast } from '@chakra-ui/react'
import { useRef } from 'react'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { nanoid } from 'nanoid'

export const FileUpload = ({ avatar, setAvatar }) => {
	const toast = useToast()
	const sizeLimit = 10 * 1024 * 1024 // 10MB
	const handleClick = () => {
		hiddenFileInput.current.click()
	}

	const handleChange = e => {
		const file = e.target.files[0]

		if (!file) return

		if (file.size > sizeLimit) {
			toast({
				title: 'File size cannot exceed 10MB.',
				description: 'Please upload a different file.',
				status: 'error',
				duration: 3000,
				isClosable: true,
				position: 'top'
			})
			return
		}

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
