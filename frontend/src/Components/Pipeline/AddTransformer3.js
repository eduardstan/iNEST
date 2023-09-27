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

function AddTransformer() {
  const [transformer, setTransformer] = useState({
    'id': '',
    'name': '',
    'params': {},
    'tags': {}
  })
  const {isOpen, onOpen, onClose} = useDisclosure()

  return (
    <>
      <Button onClick={onOpen}>Add transformer</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add transformer</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Text>Select transformer:</Text>
            <Select>
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
            </Select>
          </ModalBody>

          <ModalFooter>
            <Button 
              colorScheme='blue'
              h='1.5rem' 
              size='sm' 
              onClick={onClose}
            >
              Add
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

export default AddTransformer