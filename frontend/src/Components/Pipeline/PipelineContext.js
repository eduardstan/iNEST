import { createContext } from 'react'

const PipelineContext = createContext({
  pipeline: [], 
  fetchPipeline: () => {}
})

export default PipelineContext