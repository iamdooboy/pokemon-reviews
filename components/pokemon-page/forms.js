import {
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
  } from '@chakra-ui/react'

  import {ChevronDownIcon } from '@chakra-ui/icons'

const Forms = () => {
    return (
        <Menu >
            <MenuButton as={Button} rightIcon={<ChevronDownIcon /> }w='full' maxW='xs' mt={3} size='sm' textAlign='start'>
            Meadow Pattern
            </MenuButton>
            <MenuList>
                <MenuItem>Download</MenuItem>
                <MenuItem>Create a Copy</MenuItem>
                <MenuItem>Mark as Draft</MenuItem>
                <MenuItem>Delete</MenuItem>
                <MenuItem>Attend a Workshop</MenuItem>
            </MenuList>
        </Menu>
    )
}

export default Forms