import React from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import TokenExplorer from './pages/TokenExplorer';

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <TokenExplorer />
    </ChakraProvider>
  );
}

export default App; 