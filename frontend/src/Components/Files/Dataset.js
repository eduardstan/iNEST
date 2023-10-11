import { Button } from '@chakra-ui/react'
import API from '../../API'

function Dataset() {
  const handleBuild = async (event) => {
    event.preventDefault()
    await API.post('/files/dataset')
  }

  return (
    <>
      <Button onClick={handleBuild}>Build dataset</Button>
    </>
  )
}

export default Dataset