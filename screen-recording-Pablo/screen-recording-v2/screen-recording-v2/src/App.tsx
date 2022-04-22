import React from 'react';

import { AppHeader, MainRecorder } from '@UI';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <AppHeader/>
      <MainRecorder/>
    </ChakraProvider>
  );
}

export default App;
