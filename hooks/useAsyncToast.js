import React, { useEffect, useRef, useState } from 'react'
import { useToast, Spinner, Alert, chakra, AlertTitle } from '@chakra-ui/react'

const ToastAsync = ({ title = 'Loading...', id }) => (
	<Alert
		status='warning'
		variant='solid'
		id={id?.toString()}
		alignItems='start'
		borderRadius='md'
		boxShadow='lg'
		paddingEnd={8}
		textAlign='start'
		width='auto'
	>
		<Spinner marginRight='4' />
		<chakra.div flex='1'>
			<AlertTitle>{title}</AlertTitle>
		</chakra.div>
	</Alert>
)

export const useAsyncToast = (loading, options) => {
	const toast = useToast()
	const toastRef = useRef()
	const [isLoading, setIsLoading] = useState(loading)

	useEffect(() => {
		if (isLoading) {
			toastRef.current = toast({
				...options,
				render: () => <ToastAsync {...options} />
			})
		} else if (toastRef.current) {
			toast.close(toastRef.current)
		}
	}, [isLoading])

	return [isLoading, setIsLoading]
}
