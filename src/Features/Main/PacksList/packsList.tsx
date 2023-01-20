import React, { SyntheticEvent, useEffect } from 'react'
import { TableSearchBar } from '../../../Common/Components/TableSearchbar/tableSearchbar'
import {
  Box,
  Grid,
  OutlinedInput,
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
  Typography,
} from '@mui/material'
import { StyledTableCell } from '../../../Common/Components/StyledTableComponents/styledTableCell'
import s from '../main.module.css'
import SuperButton from '../../../Common/Components/SuperButton/superButton'
import {
  addNewPackTC,
  getPacksDataTC,
  setCurrentCardsCountAC,
  setPacksChooseAC,
  setPageAC,
  setPageCountAC,
  setSearchAC,
} from './packsListReducer'
import { useAppDispatch, UseAppSelector } from '../../../App/store'
import { TablePaginationCustom } from '../../../Common/Components/TablePagination/tablePaginationCustom'
import { PacksListTableRow } from './PacksListTableRow'
import Slider from '@mui/material/Slider'

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(() => ({
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
  const searchVal = UseAppSelector((state) => state.packsList.search)

  const packsChoose = UseAppSelector((state) => state.packsList.packsChoose)

  const maxCardsCount = UseAppSelector((state) => state.packsList.maxCardsCount)
  const minCardsCount = UseAppSelector((state) => state.packsList.minCardsCount)

  useEffect(() => {
    dispatch(getPacksDataTC())
  }, [page, pageCount, packsChoose, searchVal, dispatch, maxCardsCount, minCardsCount])

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

  const hanldeSetSearchValue = (e: string) => {
    dispatch(setSearchAC(e))
  }

  const handleSetRangeSliderValue = (
    event: Event | SyntheticEvent<Element, Event>,
    value: number | number[],
  ) => {
    if (Array.isArray(value)) {
      const maxValue: number = Number(value[1])
      const minValue: number = Number(value[0])
      dispatch(setCurrentCardsCountAC({ max: maxValue, min: minValue }))
    }
  }
  const packsList = UseAppSelector((state) => state.packsList)
  console.log(packsList)
  return (
    <div>
      <div className={s.wrapper}>
        <div className={s.title}>
          <h2>Packs list</h2>
          <SuperButton onClick={handleAddNewPack}>Add new pack</SuperButton>
        </div>
        <div className={s.toolbar}>
          <TableSearchBar onChange={hanldeSetSearchValue} />
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
          <Box sx={{ width: 300 }}>
            <Typography id="input-slider" gutterBottom align={'left'}>
              Number of cards
            </Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <OutlinedInput
                  value={minCardsCount}
                  sx={{ width: 60 }}
                  size="small"
                  inputProps={{
                    step: 10,
                    min: minCardsCount,
                    max: maxCardsCount,
                    type: 'number',
                    'aria-labelledby': 'input-slider',
                  }}
                />
              </Grid>
              <Grid item xs>
                <Slider
                  value={[minCardsCount, maxCardsCount]}
                  max={maxCardsCount}
                  min={minCardsCount}
                  // onChange={handleSetRangeSliderValue}
                  onChangeCommitted={handleSetRangeSliderValue}
                  aria-labelledby="input-slider"
                />
              </Grid>
              <Grid item>
                <OutlinedInput
                  value={maxCardsCount}
                  sx={{ width: 60 }}
                  size="small"
                  inputProps={{
                    step: 1,
                    min: minCardsCount,
                    max: maxCardsCount,
                    type: 'number',
                  }}
                />
              </Grid>
            </Grid>
          </Box>
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
