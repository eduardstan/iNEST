import { createContext } from 'react'

const AppContext = createContext({
  dataset: [], 
  fetchDataset: () => {}
})

export default AppContext