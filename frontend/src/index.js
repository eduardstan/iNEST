import React from 'react'
import { createRoot } from 'react-dom/client'
import { useEffect, useState } from 'react'
import { 
  ChakraProvider, 
  Box,
  Divider,
  AbsoluteCenter 
} from '@chakra-ui/react'

import AppContext from './AppContext'
import API from './API'
import Header from './Components/Header'
// import FileUpload from "./Components/FileUpload";
import Files from './Components/Files'
import Pipeline from './Components/Pipeline'

function App() {
  const [dataset, setDataset] = useState([])

  const fetchDataset = async () => {
    const response = await API.get('/pipeline/dataset')
    setDataset(response.data.data)
  }

  useEffect(() => {
    fetchDataset()
  }, [])
  return (
    <ChakraProvider>
      <AppContext.Provider value={{dataset, fetchDataset}}>
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
      </AppContext.Provider>
    </ChakraProvider>
  )
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);