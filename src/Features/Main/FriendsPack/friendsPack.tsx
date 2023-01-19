import React, { useEffect, useState } from 'react'
import { TableSearchBar } from '../../../Common/Components/TableSearchbar/tableSearchbar'
import { Button, Paper, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material'
import { StyledTableCell } from '../../../Common/Components/StyledTableComponents/styledTableCell'
import { addCardTC, setCardsTC } from './friendsPackReducer'
import { useAppDispatch, UseAppSelector } from '../../../App/store'
import { formatingDate } from '../../../utils/formatDate'
import { useParams } from 'react-router-dom'
import { useDebounce } from '../../../Common/Hooks/useDebounce'

export const FriendsPack = () => {
  const dispatch = useAppDispatch()
  const cards = UseAppSelector((s) => s.friendsCards.cards)

  const { packId } = useParams()
  const packIdParams = packId ? packId : ''

  const [search, setSearch] = useState('')
  const debouncedValue = useDebounce<string>(search, 500)

  useEffect(() => {
    dispatch(setCardsTC({ cardsPack_id: packIdParams, cardQuestion: search }))
  }, [debouncedValue])

  const addNewPack = () => {
    dispatch(addCardTC({ cardsPack_id: packIdParams, answer: '1', question: '2' }))
  }

  return (
    <div>
      <TableSearchBar onChange={setSearch} />
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="right">Question</StyledTableCell>
              <StyledTableCell align="right">Answer</StyledTableCell>
              <StyledTableCell align="right">Last Updated</StyledTableCell>
              <StyledTableCell align="right">Grade</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cards.map((row) => {
              const formattedDate = formatingDate(row.updated)
              return (
                <TableRow key={row._id}>
                  <StyledTableCell component="th" scope="row">
                    {row.question}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.answer}</StyledTableCell>
                  <StyledTableCell align="right">{formattedDate}</StyledTableCell>
                  <StyledTableCell align="right">{row.grade}</StyledTableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Button onClick={addNewPack}>Add new pack</Button>
    </div>
  )
}
