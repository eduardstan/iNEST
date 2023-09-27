import { useState } from 'react'
import { useDisclosure } from '@chakra-ui/react'
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Select,
  Text
} from '@chakra-ui/react'

import API from '../../API'
// import FilesContext from './FilesContext'

function ProcessFiles() { 
  const [selectedFrequency, setSelectedFrequency] = useState('M')
  const [selectedAggregationFunction, setSelectedAggregationFunction] = useState('mean')
  // const {files, fetchFiles} = useContext(FilesContext)
  const {isOpen, onOpen, onClose} = useDisclosure()

  const handleProcess = async (event) => {
    event.preventDefault()

    await API.post('/files/process', {'freq': selectedFrequency, 'pivot_aggfn': selectedAggregationFunction})

    onClose()
  }

  return (
    <>
      <Button onClick={onOpen}>Process files</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Process files</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Text>Resampling frequency:</Text>
            <Select 
              value={selectedFrequency}
              onChange={event => setSelectedFrequency(event.target.value)}
            >
              <option value='D'>Day</option>
              <option value='M'>Month</option>
              <option value='Y'>Year</option>
            </Select>

            <Text>Pivoting aggregation function (for duplicates):</Text>
            <Select 
              value={selectedAggregationFunction}
              onChange={event => setSelectedAggregationFunction(event.target.value)}
            >
              <option value='min'>Minimum value</option>
              <option value='max'>Maximum value</option>
              <option value='mean'>Mean value</option>
            </Select>
            
          </ModalBody>

          <ModalFooter>
            <Button 
              colorScheme='blue'
              h='1.5rem' 
              size='sm' 
              onClick={handleProcess}
              isActive={false}
            >
              Process
            </Button>

            <Button 
              ml={3} 
              h='1.5rem' 
              size='sm' 
              onClick={onClose}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ProcessFiles