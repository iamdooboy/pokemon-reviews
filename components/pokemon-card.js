import React from 'react'
import { Box, GridItem } from '@chakra-ui/react'
import PokemonInfo from './pokemon-info'

const PokemonCard = ({ pokemon }) => {
  return (
    <GridItem w='100%'>
      <Box
        bg='gray.100'
        bgImage="url('./bg-pokeball.svg')"
        bgPosition='center'
        bgSize='contain'
        bgRepeat='no-repeat'
        _dark={{
          bg: 'gray.800'
        }}
        maxW='sm'
        borderWidth='1px'
        rounded='lg'
        shadow='lg'
      >
        <PokemonInfo {...pokemon} />
      </Box>
    </GridItem>
  )
}

export default PokemonCard
