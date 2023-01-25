import React, { ChangeEvent, useEffect, useState } from 'react'
import { TableSearchBar } from '../../../Common/Components/TableSearchbar/tableSearchbar'
import {
  Button,
  Paper,
  Rating,
  SelectChangeEvent,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@mui/material'
import sMain from '../main.module.css'
import s from './friendsPack.module.css'
import { StyledTableCell } from '../../../Common/Components/StyledTableComponents/styledTableCell'
import { setFriendsCardsTC, setFriendPageAC, setFriendPageCountAC } from './friendsPackReducer'
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
import { TablePaginationCustom } from '../../../Common/Components/TablePagination/tablePaginationCustom'

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
      setFriendsCardsTC({
        cardsPack_id: packIdParams,
        cardQuestion: search,
        page,
        pageCount,
        sortCards: sort,
      }),
    )
  }, [debouncedValue, page, pageCount, sort])

  const handleChangePage = (event: ChangeEvent<unknown>, page: number) => {
    dispatch(setFriendPageAC(page))
  }

  const handleSortCards = (property: string) => {
    setSort(sort === `0${property}` ? `1${property}` : `0${property}`)
  }

  const handleSetPageCount = (event: SelectChangeEvent) => {
    dispatch(setFriendPageCountAC(+event.target.value))
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
                  <StyledTableCell>
                    <Rating value={row.grade} />
                  </StyledTableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePaginationCustom
        pageCount={pageCount}
        totalCountItems={cardsTotalCount}
        handleSetPage={handleChangePage}
        handleSetPageCount={handleSetPageCount}
        page={page}
      />
    </div>
  )
}
