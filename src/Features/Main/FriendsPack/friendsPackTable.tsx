import React, { FC } from 'react'
import {
  Paper,
  Rating,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@mui/material'
import { StyledTableCell } from '../../../Common/Components/StyledTableComponents/styledTableCell'
import { formatingDate } from '../../../utils/formatDate'
import { UseAppSelector } from '../../../App/store'
import { selectFriendsCards } from '../../../Common/Selectors/friendsPackSelector'

export const FriendsPackTable: FC<FriendsPackPropsType> = ({ sort, handleSortCards }) => {
  const cards = UseAppSelector(selectFriendsCards)

  const mappedCards = cards.map((row) => {
    const formattedDate = formatingDate(row.updated)
    return (
      <TableRow key={row._id}>
        <StyledTableCell component="th" scope="row">
          {row.question}
        </StyledTableCell>
        <StyledTableCell>{row.answer}</StyledTableCell>
        <StyledTableCell>{formattedDate}</StyledTableCell>
        <StyledTableCell>
          <Rating value={row.grade} />
        </StyledTableCell>
      </TableRow>
    )
  })

  return (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell onClick={() => handleSortCards('question')}>
              Question
              <TableSortLabel
                active={sort === '0question' || sort === '1question'}
                direction={sort === '1question' ? 'asc' : 'desc'}
              />
            </StyledTableCell>
            <StyledTableCell>Answer</StyledTableCell>
            <StyledTableCell onClick={() => handleSortCards('updated')}>
              Last Updated
              <TableSortLabel
                active={sort === '0updated' || sort === '1updated'}
                direction={sort === '1updated' ? 'asc' : 'desc'}
              />
            </StyledTableCell>
            <StyledTableCell onClick={() => handleSortCards('grade')}>
              Grade
              <TableSortLabel
                active={sort === '0grade' || sort === '1grade'}
                direction={sort === '1grade' ? 'asc' : 'desc'}
              />
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>{mappedCards}</TableBody>
      </Table>
    </TableContainer>
  )
}

type FriendsPackPropsType = {
  sort: string
  handleSortCards: (property: string) => void
}
