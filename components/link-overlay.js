import NextLink from 'next/link'
import { Link } from '@chakra-ui/react'

export const LinkOverlay = ({ href, children }) => {
	return (
		<NextLink href={href} passHref>
			<Link _hover={{ textDecoration: 'none' }} my={3}>
				{children}
			</Link>
		</NextLink>
	)
}
