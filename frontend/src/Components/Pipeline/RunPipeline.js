import { Button } from '@chakra-ui/react'

function RunPipeline() {
  const handleRunPipeline = (event) => {
    console.log("here")
  }

  return (
    <>
      <Button onClick={handleRunPipeline}>Run Pipeline</Button>
    </>
  )
}

export default RunPipeline