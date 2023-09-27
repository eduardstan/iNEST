import { useEffect, useState } from 'react'
import API from '../API'
import AddFile from './Files/AddFile'
import FilesContext from './Files/FilesContext'
import ProcessFiles from './Files/ProcessFiles'
import ShowHideFiles from './Files/ShowHideFiles'

function Files() {
  const [files, setFiles] = useState([])

  const fetchFiles = async () => {
    const response = await API.get('/files/list')
    setFiles(response.data.data)
  }

  useEffect(() => {
    fetchFiles()
  }, [])

  return (
    <FilesContext.Provider value={{files, fetchFiles}}>
      <AddFile />
      <ProcessFiles />
      <ShowHideFiles />
    </FilesContext.Provider>
  )
}

export default Files
