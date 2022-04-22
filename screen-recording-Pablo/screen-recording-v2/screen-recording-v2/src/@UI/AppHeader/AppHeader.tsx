import React from 'react';
import { Flex, Heading, useTheme, Theme } from '@chakra-ui/react';
import theme from 'theme';

const AppHeader = () => {
  return (
    <Flex as='nav' flex='1' mb={4} padding='1.5rem' bg={theme.colors.blue[500]} color='white' >
      <Heading>Amazon Connect</Heading>

    </Flex>
  )
}


export default AppHeader