import { useContext, useState } from 'react'
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Input,
  InputGroup
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import uuid from 'react-uuid'
import API from '../../API'
import FilesContext from './FilesContext'

function AddFile() {
  const [path, setPath] = useState('')
  const {fetchFiles} = useContext(FilesContext)
  const {isOpen, onOpen, onClose} = useDisclosure()

  function handleInput(event) {
    setPath(event.target.value)
  }

  const handleAdd = async (event) => {
    event.preventDefault()

    const newFile = {
      "id": uuid(),
      "path": path
    }

    await API.post('/files/add', newFile)
    fetchFiles()

    onClose()
  }

  return (
    <>
      <Button onClick={onOpen}>Add file</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add file</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type="text"
                placeholder="Add file path"
                aria-label="Add file path"
                // value={todo}
                onChange={handleInput}
              />
            </InputGroup>
          </ModalBody>

          <ModalFooter>
            <Button 
              colorScheme='blue'
              h='1.5rem' 
              size='sm' 
              onClick={handleAdd}
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

export default AddFile