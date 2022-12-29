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

export const FileUpload = props => {
	const styles = useMultiStyleConfig('Button', { variant: 'outline' })

	return (
		<>
			<FormLabel>Files</FormLabel>
			<Input
				type='file'
				sx={{
					'::file-selector-button': {
						height: 10,
						padding: 0,
						mr: 4,
						background: 'none',
						border: 'none',
						fontWeight: 'bold'
					}
				}}
			/>
		</>
	)
}
