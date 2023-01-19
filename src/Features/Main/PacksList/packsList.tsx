import React, { useEffect, useState } from 'react'
import { TableSearchBar } from '../../../Common/Components/TableSearchbar/tableSearchbar'
import {
  Paper,
  SelectChangeEvent,
  styled,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material'
import { StyledTableCell } from '../../../Common/Components/StyledTableComponents/styledTableCell'
import s from '../main.module.css'
import SuperButton from '../../../Common/Components/SuperButton/superButton'
import {
  addNewPackTC,
  getPacksDataTC,
  setPacksChooseAC,
  setPageAC,
  setPageCountAC,
} from './packsListReducer'
import { useAppDispatch, UseAppSelector } from '../../../App/store'
import { TablePaginationCustom } from '../../../Common/Components/TablePagination/tablePaginationCustom'
import { PacksListTableRow } from './PacksListTableRow'

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  '& .MuiToggleButtonGroup-grouped': {
    border: '1px solid #D9D9D9',
    borderRadius: '2px',
    '&.Mui-selected': {
      background: '#366EFF',
      color: '#FFFFFF',
      borderRadius: '0px 2px 2px 0px',
    },
  },
}))

export const PacksList = () => {
  const dispatch = useAppDispatch()
  const cardPacks = UseAppSelector((state) => state.packsList.cardPacks)
  const page = UseAppSelector((state) => state.packsList.page)
  const pageCount = UseAppSelector((state) => state.packsList.pageCount)
  const cardPacksTotalCount = UseAppSelector((state) => state.packsList.cardPacksTotalCount)

  const packsChoose = UseAppSelector((state) => state.packsList.packsChoose)
  const [test, setTest] = useState('')
  useEffect(() => {
    dispatch(getPacksDataTC())
  }, [page, pageCount, packsChoose])

  const handleAddNewPack = () => {
    dispatch(addNewPackTC())
  }

  const handleSetPage = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(setPageAC(value))
  }

  const handleSetPageCount = (event: SelectChangeEvent) => {
    dispatch(setPageCountAC(+event.target.value))
  }

  const mappedPacks = cardPacks.map((packData) => {
    return <PacksListTableRow packData={packData} />
  })

  const handleSetPacksChoose = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: 'all' | 'my',
  ) => {
    if (newAlignment !== null) {
      dispatch(setPacksChooseAC(newAlignment))
    }
  }

  return (
    <div>
      <div className={s.wrapper}>
        <div className={s.title}>
          <h2>Packs list</h2>
          <SuperButton onClick={handleAddNewPack}>Add new pack</SuperButton>
        </div>
        <div className={s.toolbar}>
          <TableSearchBar onChange={setTest} />
          <StyledToggleButtonGroup
            color="primary"
            value={packsChoose}
            exclusive
            onChange={handleSetPacksChoose}
            aria-label="Platform"
          >
            <ToggleButton value="my">my</ToggleButton>
            <ToggleButton value="all">all</ToggleButton>
          </StyledToggleButtonGroup>
        </div>

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
