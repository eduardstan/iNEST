import { useContext } from 'react'

import { Button } from '@chakra-ui/react'
import API from '../../API'
import PipelineContext from './PipelineContext'

function MoveUpDown({ transformer, direction }) {
  const {pipeline, fetchPipeline} = useContext(PipelineContext)

  const handleMoveUpDown = async (t, d) => {

    const newStep = {
      'transformer': t,
      'dir': d
    }

    await API.put('/pipeline/moveupdown', newStep)

    fetchPipeline()
  }

  return (
    <>
      <Button
        onClick={() => handleMoveUpDown(transformer, direction)}
      >
        {direction == "up" ? 'Move up' : 'Move down'}
      </Button>
    </>
  )
}

export default MoveUpDown