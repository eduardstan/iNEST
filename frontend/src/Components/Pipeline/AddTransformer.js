import { useContext, useState } from 'react'
import { FormControl, FormLabel, useDisclosure } from '@chakra-ui/react'
import {
  Button,
  Input,
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
  const [params, setParams] = useState({...transformer.params})
  const {fetchPipeline} = useContext(PipelineContext)
  const modal = useDisclosure()

  const handleAddStep = async (event) => {
    event.preventDefault()

    const newStep = {
      'id': uuid(),
      ...transformer,
      // 'name': transformer.name,
      // 'doc': transformer.doc,
      // 'tags': transformer.tags,
      'params': params
    }

    await API.post('/pipeline/add', newStep)
    fetchPipeline()

    modal.onClose()
  }

  const handleChange = (event, type) => {
    setParams({
      ...params, 
      [event.target.name]: { 
        'value': event.target.value,
        'type': type
      } 
    })
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
          <FormControl>
            {Object.entries(transformer.params).map(([par, val]) =>
              <>
                <FormLabel>
                  {par} ({val.type})
                </FormLabel>

                <Input name={par} placeholder={val.value} onChange={(e) => handleChange(e, val.type)}></Input>
              </>
            )}
          </FormControl>

          {/* <Text>Parameters:</Text>
          {Object.entries(transformer.params).map(([p, v]) => 
            <>
              <Text>{p}</Text>
              <Input placeholder={v} onChange={handleChange}></Input>
            </>
          )} */}

          <Text>Documentation:</Text>
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