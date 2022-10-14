import NextLink from 'next/link'
import { Link } from '@chakra-ui/react'

export const LinkOverlay = ({ href, children, ...props }) => {
	return (
		<NextLink href={href} passHref>
			<Link _hover={{ textDecoration: 'none' }} {...props}>
				{children}
			</Link>
		</NextLink>
	)
}
