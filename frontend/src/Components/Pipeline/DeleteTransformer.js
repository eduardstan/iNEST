import { useContext } from 'react'
import { Button } from '@chakra-ui/react'
import API from '../../API'
import PipelineContext from './PipelineContext'

function DeleteTransformer({ step }) {
  const {fetchPipeline} = useContext(PipelineContext)

  const handleDeleteTransformer = async () => {
    await API.delete(`/pipeline/delete/${step.id}`)
    fetchPipeline()
  }

  return (
    <>
      <Button
        _hover={{ bg: 'red.500' }}
        onClick={handleDeleteTransformer}
        size='sm'
        h='1.5rem'
      >
        Delete
      </Button>
    </>
  )
}

export default DeleteTransformer