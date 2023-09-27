import { createContext } from 'react'

const FilesContext = createContext({
  files: [], 
  fetchFiles: () => {}
})

export default FilesContext