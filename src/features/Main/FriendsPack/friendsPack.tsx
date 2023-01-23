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
  TableSortLabel,
} from '@mui/material'
import sMain from '../Main.module.css'
import s from './friendsPack.module.css'
import { StyledTableCell } from '../../../Common/Components/StyledTableComponents/styledTableCell'
import { addFriendPaginationSwitchAC, setCardsTC } from './friendsPackReducer'
import { useAppDispatch, UseAppSelector } from '../../../App/store'
import { formatingDate } from '../../../utils/formatDate'
import { NavLink, useParams } from 'react-router-dom'
import { useDebounce } from '../../../Common/Hooks/useDebounce'
import { Title } from '../../../Common/Components/Title/title'
import { KeyboardBackspace } from '@mui/icons-material'
import {
  selectFriendsCards,
  selectFriendsCardsPage,
  selectFriendsCardsPageCount,
  selectFriendsCardsTotalCount,
} from '../../../Common/Selectors/friendsPackSelector'

export const FriendsPack = () => {
  const dispatch = useAppDispatch()
  const cards = UseAppSelector(selectFriendsCards)
  const page = UseAppSelector(selectFriendsCardsPage)
  const pageCount = UseAppSelector(selectFriendsCardsPageCount)
  const cardsTotalCount = UseAppSelector(selectFriendsCardsTotalCount)

  const { packId } = useParams()
  const packIdParams = packId ? packId : ''

  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('')

  const debouncedValue = useDebounce<string>(search, 500)

  useEffect(() => {
    dispatch(
      setCardsTC({ cardsPack_id: packIdParams, cardQuestion: search, page, sortCards: sort }),
    )
  }, [debouncedValue, page, sort])

  const handleChangePage = (event: ChangeEvent<unknown>, page: number) => {
    dispatch(addFriendPaginationSwitchAC(page))
  }

  const handleSortCards = (property: string) => {
    setSort(sort === `0${property}` ? `1${property}` : `0${property}`)
  }

  return (
    <div className={sMain.wrapper}>
      <NavLink to={'/packs-list'} className={s.backLink}>
        <KeyboardBackspace />
        Back to Packs List
      </NavLink>
      <div className={s.titleWrapper}>
        <Title title="Friend’s Pack" />
        <Button variant="contained">Learn to pack</Button>
      </div>

      <TableSearchBar onChange={setSearch} />
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell onClick={() => handleSortCards('question')}>
                <TableSortLabel
                  active={sort === '0question' || sort === '1question'}
                  direction={sort === '1question' ? 'asc' : 'desc'}
                />
                Question
              </StyledTableCell>
              <StyledTableCell>Answer</StyledTableCell>
              <StyledTableCell onClick={() => handleSortCards('updated')}>
                <TableSortLabel
                  active={sort === '0updated' || sort === '1updated'}
                  direction={sort === '1updated' ? 'asc' : 'desc'}
                />
                Last Updated
              </StyledTableCell>
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
    </div>
  )
}
