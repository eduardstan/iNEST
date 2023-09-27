import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react'

import DeleteFile from './DeleteFile'

function TableFiles({ files }) {
  return (
    <>
      <TableContainer>
        <Table variant='simple' size='sm'>
          <Thead>
            <Tr>
              <Th>
                File ID
              </Th>
              <Th>
                File path
              </Th>
              <Th>
                Delete
              </Th>
            </Tr>
          </Thead>

          <Tbody>
            {
              files.map((file, i) => {
                return (
                  <>
                  <Tr>
                    <Td>
                      {`${file.id}`}
                    </Td>
                    <Td>
                      {`${file.path}`}
                    </Td>
                    <Td>
                      <DeleteFile file={file} />
                    </Td>
                  </Tr>
                  </>
                )
              })
            }
          </Tbody>
        </Table>
      </TableContainer>
    </>
  )
}

export default TableFiles