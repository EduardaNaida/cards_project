import React, { useEffect, useState } from 'react'
import { TableSearchBar } from '../../../Common/Components/TableSearchbar/tableSearchbar'
import {
  IconButton,
  Paper,
  SelectChangeEvent,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { StyledTableCell } from '../../../Common/Components/StyledTableComponents/styledTableCell'
import { formatingDate } from '../../../utils/formatDate'
import s from '../main.module.css'
import SchoolIcon from '@mui/icons-material/School'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import SuperButton from '../../../Common/Components/SuperButton/superButton'
import {
  addNewPackTC,
  deletePackTC,
  getPacksDataTC,
  setPageAC,
  setPageCountAC,
  updatePackTC,
} from './packsListReducer'
import { useAppDispatch, UseAppSelector } from '../../../App/store'
import { TablePaginationCustom } from '../../../Common/Components/TablePagination/tablePaginationCustom'

export const PacksList = () => {
  const dispatch = useAppDispatch()
  const cardPacks = UseAppSelector((state) => state.packsList.cardPacks)
  const packsList = UseAppSelector((state) => state.packsList)
  const page = UseAppSelector((state) => state.packsList.page)
  const pageCount = UseAppSelector((state) => state.packsList.pageCount)
  const cardPacksTotalCount = UseAppSelector((state) => state.packsList.cardPacksTotalCount)

  const userId = UseAppSelector((state) => state.user._id)

  const [test, setTest] = useState('')
  useEffect(() => {
    if (userId !== null) {
      dispatch(getPacksDataTC())
    }
  }, [page, pageCount])

  const handleAddNewPack = () => {
    if (userId !== null) {
      dispatch(addNewPackTC(userId))
    }
  }
  const handleDeletePack = (pack_id: string) => {
    if (userId !== null) {
      dispatch(deletePackTC(pack_id, userId))
    }
  }
  const handleUpdateTask = (pack_id: string) => {
    if (userId !== null) {
      dispatch(updatePackTC({ _id: pack_id, name: '!UPDATED!' }, userId))
    }
  }

  const handleSetPage = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(setPageAC(value))
  }

  const handleSetPageCount = (event: SelectChangeEvent) => {
    dispatch(setPageCountAC(+event.target.value))
  }

  console.log('packs', packsList)

  const mappedPacks = cardPacks.map((row) => {
    const formattedDate = formatingDate(row.updated)
    return (
      <TableRow key={row._id}>
        <StyledTableCell component="th" scope="row">
          {row.name}
        </StyledTableCell>
        <StyledTableCell align="right">{row.cardsCount}</StyledTableCell>
        <StyledTableCell align="right">{formattedDate}</StyledTableCell>
        <StyledTableCell align="right">{row.user_name}</StyledTableCell>
        <StyledTableCell align="right">
          <IconButton>
            <SchoolIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              handleUpdateTask(row._id)
            }}
          >
            <BorderColorIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              handleDeletePack(row._id)
            }}
          >
            <DeleteForeverIcon />
          </IconButton>
        </StyledTableCell>
      </TableRow>
    )
  })

  return (
    <div>
      <div className={s.wrapper}>
        <div className={s.title}>
          <h2>Packs list</h2>
          <SuperButton onClick={handleAddNewPack}>Add new pack</SuperButton>
        </div>
        <TableSearchBar onChange={setTest} />
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="right">Cards</StyledTableCell>
                <StyledTableCell align="right">Last Updated</StyledTableCell>
                <StyledTableCell align="right">Created by</StyledTableCell>
                <StyledTableCell align="right">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>{mappedPacks}</TableBody>
          </Table>
        </TableContainer>
        <TablePaginationCustom
          pageCount={pageCount}
          totalCountItems={cardPacksTotalCount}
          handleSetPage={handleSetPage}
          handleSetPageCount={handleSetPageCount}
          page={page}
        />
      </div>
    </div>
  )
}
