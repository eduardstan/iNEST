import { useContext } from 'react'
import { Button } from '@chakra-ui/react'
import API from '../../API'
import FilesContext from './FilesContext'

function DeleteFile({ file }) {
  const {fetchFiles} = useContext(FilesContext)

  const handleDeleteFile = async () => {
    await API.delete(`/files/delete/${file.id}`)
    fetchFiles()
  }

  return (
    <>
      <Button
        _hover={{ bg: 'red.500' }}
        onClick={handleDeleteFile}
        size='sm'
        h='1.5rem'
      >
        Delete
      </Button>
    </>
  )
}

export default DeleteFile