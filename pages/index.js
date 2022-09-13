import { Container, Heading, Box, Input } from '@chakra-ui/react'
import Head from 'next/head'
import PokemonContainer from '../components/pokemon-container'

const Page = () => {
  return (
    <Box as='main' minHeight='100vh'>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <title>Duy Le - Homepage</title>
      </Head>
      <Container maxW='7xl' bg='green.400'>
        <Heading
          as='h1'
          size='xl'
          variant='section-title'
          bg='red.100'
          align='center'
        >
          Pokemon Reviews
        </Heading>
        <Heading as='h1' size='md' noOfLines={1} align='center'>
          Nintendo have been creating a lot of questionable pokemon. Luckily
          they are looking for your feedback.
        </Heading>
        <Input
          placeholder='What pokemon are you looking for?'
          size='lg'
          bg='blue.100'
        />
        <PokemonContainer />
      </Container>
    </Box>
  )
}

export default Page
