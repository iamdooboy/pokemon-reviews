import React from 'react'
import { Box, Grid, Text, Image } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'

const PokemonInfo = ({ imageUrl, imageAlt, name, rating, reviewCount }) => {
  return (
    <>
      <Image src={imageUrl} alt={imageAlt} roundedTop='lg' my='-5px' />
      <Box>
        <Text
          fontWeight='bold'
          as='h1'
          lineHeight='tight'
          noOfLines={1}
          align='center'
        >
          {name}
        </Text>

        <Box display='flex' mt='2' justifyContent='center'>
          {Array(5)
            .fill('')
            .map((_, i) => (
              <StarIcon
                key={i}
                color={i < rating ? 'yellow.400' : 'gray.300'}
              />
            ))}
        </Box>
        <Box color='gray.600' fontSize='sm' align='center'>
          {reviewCount} ratings
        </Box>
      </Box>
    </>
  )
}

export default PokemonInfo
