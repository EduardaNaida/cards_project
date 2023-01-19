import React, { ChangeEvent, useEffect, useState } from 'react'
import { TableSearchBar } from '../../../Common/Components/TableSearchbar/tableSearchbar'
import {
  Button,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import s from '../Main.module.css'
import { StyledTableCell } from '../../../Common/Components/StyledTableComponents/styledTableCell'
import { addCardTC, addFriendPaginationSwitchAC, setCardsTC } from './friendsPackReducer'
import { useAppDispatch, UseAppSelector } from '../../../App/store'
import { formatingDate } from '../../../utils/formatDate'
import { useParams } from 'react-router-dom'
import { useDebounce } from '../../../Common/Hooks/useDebounce'

export const FriendsPack = () => {
  const dispatch = useAppDispatch()
  const cards = UseAppSelector((s) => s.friendsCards.cards)
  const page = UseAppSelector((s) => s.friendsCards.page)
  const pageCount = UseAppSelector((s) => s.friendsCards.pageCount)
  const cardsTotalCount = UseAppSelector((s) => s.friendsCards.cardsTotalCount)

  const { packId } = useParams()
  const packIdParams = packId ? packId : ''

  const [search, setSearch] = useState('')
  const debouncedValue = useDebounce<string>(search, 500)

  useEffect(() => {
    dispatch(setCardsTC({ cardsPack_id: packIdParams, cardQuestion: search, page }))
  }, [debouncedValue, page])

  const addNewPack = () => {
    dispatch(addCardTC({ cardsPack_id: packIdParams, answer: '1', question: '2' }))
  }

  const handleChangePage = (event: ChangeEvent<unknown>, page: number) => {
    dispatch(addFriendPaginationSwitchAC(page))
  }

  return (
    <div className={s.wrapper}>
      <TableSearchBar onChange={setSearch} />
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Question</StyledTableCell>
              <StyledTableCell>Answer</StyledTableCell>
              <StyledTableCell>Last Updated</StyledTableCell>
              <StyledTableCell>Grade</StyledTableCell>
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
                  <StyledTableCell>{row.answer}</StyledTableCell>
                  <StyledTableCell>{formattedDate}</StyledTableCell>
                  <StyledTableCell>{row.grade}</StyledTableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={Math.ceil(cardsTotalCount / pageCount)}
        page={page}
        onChange={handleChangePage}
        variant="text"
        shape="rounded"
        color="primary"
      />
      <Button onClick={addNewPack}>Add new pack</Button>
    </div>
  )
}
