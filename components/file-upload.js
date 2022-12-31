// import {
// 	Input,
// 	FormControl,
// 	FormLabel,
// 	InputGroup,
// 	InputLeftElement,
// 	FormErrorMessage,
// 	Code,
// 	Icon
// } from '@chakra-ui/react'
// import { FiFile } from 'react-icons/fi'
// import { useController } from 'react-hook-form'
// import { useRef } from 'react'

// const FileUpload = ({
// 	name,
// 	placeholder,
// 	acceptedFileTypes,
// 	control,
// 	children,
// 	isRequired = false
// }) => {
// 	const inputRef = useRef()
// 	const {
// 		field: { ref, onChange, value, ...inputProps },
// 		meta: { invalid, isTouched, isDirty }
// 	} = useController({
// 		name,
// 		control,
// 		rules: { required: isRequired }
// 	})

// 	return (
// 		<FormControl isInvalid={invalid} isRequired>
// 			<FormLabel htmlFor='writeUpFile'>{children}</FormLabel>
// 			<InputGroup>
// 				<InputLeftElement
// 					pointerEvents='none'
// 					children={<Icon as={FiFile} />}
// 				/>
// 				<input
// 					type='file'
// 					accept={acceptedFileTypes}
// 					name={name}
// 					ref={inputRef}
// 					{...inputProps}
// 					inputRef={ref}
// 					style={{ display: 'none' }}
// 				></input>
// 				<Input
// 					onChange={e => onChange(e.target.files[0])}
// 					placeholder={placeholder || 'Your file ...'}
// 					onClick={() => inputRef.current.click()}
// 					value={value}
// 				/>
// 			</InputGroup>
// 			<FormErrorMessage>{invalid}</FormErrorMessage>
// 		</FormControl>
// 	)
// }

// export default FileUpload
import {
	useMultiStyleConfig,
	useStyles,
	Input,
	Button,
	FormControl,
	FormLabel,
	FormHelperText
} from '@chakra-ui/react'
import { useRef } from 'react'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { CheckCircleIcon } from '@chakra-ui/icons'
import { nanoid } from 'nanoid'

export const FileUpload = ({ setAvatar }) => {
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
		// <Button
		// 	//isLoading
		// 	loadingText='Uploading...'
		// 	leftIcon={<CheckCircleIcon color='green.300' />}
		// 	onClick={handleClick}
		// >
		// 	<Input
		// 		type='file'
		// 		ref={hiddenFileInput}
		// 		onChange={handleChange}
		// 		display='none'
		// 	/>
		// 	Successfully uploaded
		// </Button>
		<Button
			leftIcon={<AiOutlineCloudUpload />}
			onClick={handleClick}
			variant='ghost'
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
