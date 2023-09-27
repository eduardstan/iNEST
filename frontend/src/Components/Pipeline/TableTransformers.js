import { useEffect, useState } from 'react'
import uuid from 'react-uuid'
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useDisclosure,
} from '@chakra-ui/react'

import API from '../../API'
import AddTransformer from './AddTransformer'

function Transformers() {
  const [transformers, setTransformers] = useState([])
  const modal = useDisclosure()

  const fetchTransformers = async () => {
    const response = await API.get('/pipeline/list/transformers')
    setTransformers(response.data.data)
  }

  // Perhaps this is wrong
  useEffect(() => {
    fetchTransformers()
  }, [])

  return (
    <>
      <Box padding={4} overflowY='auto' maxHeight='290px'>
        <TableContainer>
        <Table variant='simple' size='sm'>
            <Thead position='sticky' bgColor='pink'>
              <Tr position='sticky'>
                <Th>Name</Th>
                <Th>Input</Th>
                <Th>Output</Th>
                <Th>Instancewise?</Th>
                <Th>Univariate?</Th>
                <Th>Handles missing data?</Th>
                <Th>Add</Th>
              </Tr>
            </Thead>

            <Tbody>
              {
                transformers.map(t => {
                  return (
                    <>
                      <Tr _hover={{ bg: 'blue.400'}}>
                        <Td>{`${t.name}`}</Td>
                        <Td>{`${t.tags['scitype:transform-input']}`}</Td>
                        <Td>{`${t.tags['scitype:transform-output']}`}</Td>
                        <Td>{`${t.tags['scitype:instancewise'] ? t.tags['scitype:instancewise'] : 'True'}`}</Td>
                        <Td>{`${t.tags['univariate-only'] ? t.tags['univariate-only'] : 'False'}`}</Td>
                        <Td>{`${t.tags['handles-missing-data'] ? t.tags['handles-missing-data'] : 'False'}`}</Td>
                        <Td><AddTransformer transformer={t}/></Td>
                      </Tr>
                    </>
                  )
                })
              }
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  )
}

export default Transformers