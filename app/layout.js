'use client'

import Header from './header'
import { ColorModeScript } from '@chakra-ui/react'
import theme from '../lib/theme'

import { ChakraProvider } from '@chakra-ui/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <head />
      <body>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <ChakraProvider theme={theme}>
          <Header />
          {children}
        </ChakraProvider>
      </body>
    </html>
  )
}