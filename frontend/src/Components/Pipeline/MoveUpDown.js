import { useContext } from 'react'

import { FaArrowUp, FaArrowDown } from 'react-icons/fa'

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
        // rightIcon={direction == 'up' ? <ArrowUpIcon />: <ArrowDownIcon />}
        onClick={() => handleMoveUpDown(transformer, direction)}
      >
        {direction == "up" ? <FaArrowUp />: <FaArrowDown />}
      </Button>
    </>
  )
}

export default MoveUpDown