import React, { ChangeEvent, useEffect, useState } from 'react'
import { TableSearchBar } from '../../../Common/Components/TableSearchbar/tableSearchbar'
import { Button, SelectChangeEvent } from '@mui/material'
import sMain from '../main.module.css'
import s from './friendsPack.module.css'
import { setFriendPageAC, setFriendPageCountAC, setFriendsCardsTC } from './friendsPackReducer'
import { useAppDispatch, UseAppSelector } from '../../../App/store'
import { useNavigate, useParams } from 'react-router-dom'
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
import { FriendsPackTable } from './friendsPackTable'
import { NavToMain } from '../../../Common/Components/NavToMain/navToMain'

export const FriendsPack = () => {
  const dispatch = useAppDispatch()
  const cards = UseAppSelector(selectFriendsCards)
  const page = UseAppSelector(selectFriendsCardsPage)
  const pageCount = UseAppSelector(selectFriendsCardsPageCount)
  const cardsTotalCount = UseAppSelector(selectFriendsCardsTotalCount)

  const navigate = useNavigate()
  const { packId } = useParams()
  const packIdParams = packId ? packId : ''

  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('')

  const debouncedValue = useDebounce<string>(search, 500)

  const handleNavigateToLearn = () => {
    navigate(`/learn/${packIdParams}`)
  }

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
      <NavToMain />
      <div className={s.titleWrapper}>
        <Title title="Friend’s Pack" />
        <Button variant="contained" onClick={handleNavigateToLearn}>
          Learn to pack
        </Button>
      </div>
      <TableSearchBar onChange={setSearch} />
      <FriendsPackTable sort={sort} handleSortCards={handleSortCards} />
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
