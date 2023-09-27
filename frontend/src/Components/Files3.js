import { createContext, useContext, useEffect, useState } from 'react';
import uuid from 'react-uuid'
import { Input, InputGroup, Stack } from "@chakra-ui/react";

import API from '../API'


const FilesContext = createContext({
  files: [], 
  fetchFiles: () => {}
});

function AddFile() {
  const [file, setFile] = useState('')
  const {files, fetchFiles} = useContext(FilesContext)

  function handleInput(e) {
    setFile(e.target.value)
  }

  function handleSubmit(e) {
    const newFile = {
      "id": uuid(),
      "path": file
    }

    console.log(newFile)

    fetch("http://localhost:8000/files/add", {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newFile)
    }).then(fetchFiles)
  }

  return (
    <form onSubmit={handleSubmit}>
      <InputGroup size="md">
        <Input
          pr="4.5rem"
          type="text"
          placeholder="Add a todo item"
          aria-label="Add a todo item"
          onChange={handleInput}
        />
      </InputGroup>
    </form>
  )
}

function ListFiles() {
    // Create an array-like state variable "files" and a state method "setFiles"
    const [files, setFiles] = useState([])

    // Asynchronously fetch the files from the backend and update the "files" variable
    // const fetchFiles = async () => {
    //     const response = await fetch('http://localhost:8000/files/list')
    //     const files = await response.json()
    //     setFiles(files.data)
    // }

    const fetchFiles = async () => {
      const response = await API.get('/files/list')
      console.log(response)
      setFiles(response.data.data)
    }

    useEffect(() => {
      fetchFiles()
    }, [])

    return (
      <FilesContext.Provider value={{files, fetchFiles}}>
        <Stack spacing={5}>
        {
          files.map((file) => (
            <b>{file.path}</b>
          ))
        }
        </Stack>
      </FilesContext.Provider>
    )
}

function Files() {
  return (
    <>
      <AddFile />
      <ListFiles />
    </>
  );
}

export default Files;