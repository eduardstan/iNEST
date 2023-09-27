import { useEffect, useState } from 'react'

import API from '../API'
import Diagram from './Pipeline/Diagram'
import PipelineContext from './Pipeline/PipelineContext'
import TableTransformers from './Pipeline/TableTransformers'

function Pipeline() {
  const [pipeline, setPipeline] = useState([])

  const fetchPipeline = async () => {
    const response = await API.get('/pipeline/list')
    setPipeline(response.data.data)
  }

  useEffect(() => {
    fetchPipeline()
  }, [])

  return (
    <PipelineContext.Provider value={{pipeline, fetchPipeline}}>
      <TableTransformers />
      <Diagram />
    </PipelineContext.Provider>
  )
}

export default Pipeline