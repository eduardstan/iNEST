import { useContext } from 'react'

import ArrowUpIcon from 'react-icons'

import {
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Tab,
} from '@chakra-ui/react'
import MoveUpDown from './MoveUpDown'
import PipelineContext from './PipelineContext'
import DeleteTransformer from './DeleteTransformer'

function Diagram() {
  const {pipeline} = useContext(PipelineContext)

  return (
    <>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>
                Transformer name
              </Th>
              <Th>
                Pre statistics
              </Th>
              <Th>
                Post statistics
              </Th>
              <Th>
                Move up
              </Th>
              <Th>
                Move down
              </Th>
              <Th>
                Delete
              </Th>
            </Tr>
          </Thead>
            {
              pipeline.map(step => {
                return (
                  <>
                    <Tr>
                      <Td>
                        {`${step.name}`}
                      </Td>
                      <Td>
                        Pre
                      </Td>
                      <Td>
                        Post
                      </Td>
                      <Td>
                        <MoveUpDown 
                          transformer={step}
                          direction='up'
                        />
                      </Td>
                      <Td>
                        <MoveUpDown 
                            transformer={step}
                            direction='down'
                          />
                      </Td>
                      <Td>
                        <DeleteTransformer step={step} />
                      </Td>
                    </Tr>
                  </>
                )
              })
            }
          <Tbody>

          </Tbody>
        </Table>
      </TableContainer>
    </>
  )
}

export default Diagram