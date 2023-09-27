import { useContext } from 'react'

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
                Move up
              </Th>
              <Th>
                Move down
              </Th>
            </Tr>
          </Thead>
            {
              pipeline.map(step => {
                return (
                  <>
                    <Tr>
                      <Td>
                        {`${step.transformer.name}`}
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