import { useContext, useState } from 'react'
import { Button } from '@chakra-ui/react'
import FilesContext from './FilesContext'
import TableFiles from './TableFiles'

function ShowHideFiles() {
  const [isHidden, setHidden] = useState(true)
  const {files} = useContext(FilesContext)

  const handleHidden = (event) => {
    setHidden(!isHidden)
  }

  return (
    <>
      <Button onClick={handleHidden}>{isHidden ? 'Show' : 'Hide'} files</Button>
      {!isHidden && <TableFiles files={files} />}
    </>
  )
}

export default ShowHideFiles