import React from "react";
import { createRoot } from 'react-dom/client';
import { 
  ChakraProvider, 
  Box,
  Divider,
  AbsoluteCenter 
} from '@chakra-ui/react'

import Header from "./Components/Header";
// import FileUpload from "./Components/FileUpload";
import Files from './Components/Files';
import Pipeline from './Components/Pipeline'

function App() {
  return (
    <ChakraProvider>
      <Header />
      <Box position='relative' padding='10'>
        <Divider />
        <AbsoluteCenter bg='white' px='4'>
          FILES
        </AbsoluteCenter>
      </Box>
      <Files />
      <Box position='relative' padding='10'>
        <Divider />
        <AbsoluteCenter bg='white' px='4'>
          PIPELINE
        </AbsoluteCenter>
      </Box>
      <Pipeline />
    </ChakraProvider>
  )
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);