import { useContext } from 'react'
import { useDisclosure } from '@chakra-ui/react'
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Text
} from '@chakra-ui/react'
import uuid from 'react-uuid'
import API from '../../API'
import PipelineContext from './PipelineContext'

function AddTransformer({ transformer }) {
  const {fetchPipeline} = useContext(PipelineContext)
  const modal = useDisclosure()

  const handleAddStep = async (event) => {
    event.preventDefault()

    const newStep = {
      'id': uuid(),
      'transformer': transformer,
      'params': {
        'num_intervals': 4
      }
    }

    await API.post('/pipeline/add', newStep)
    fetchPipeline()

    modal.onClose()
  }

  return (
    <>
      <Button 
        onClick={modal.onOpen}
        size='sm'
        h='1.5rem'
        _hover={{ bg: 'green.400' }}
      >
        Add
      </Button>

      <Modal isOpen={modal.isOpen} onClose={modal.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add transformer ({transformer.name})</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          {transformer.doc.split('\n').map(str => <Text>{str}</Text>)}
        </ModalBody>

        <ModalFooter>
          <Button 
            colorScheme='blue'
            h='1.5rem' 
            size='sm' 
            onClick={handleAddStep}
          >
            Add
          </Button>

          <Button 
            ml={3} 
            h='1.5rem' 
            size='sm' 
            onClick={modal.onClose}
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