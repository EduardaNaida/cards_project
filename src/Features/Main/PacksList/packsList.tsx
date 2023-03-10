import React, { SyntheticEvent, useEffect, useState } from 'react'
import { TableSearchBar } from '../../../Common/Components/TableSearchbar/tableSearchbar'
import {
  Box,
  FormControl,
  FormLabel,
  Grid,
  IconButton,
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
  Tooltip,
  Typography,
} from '@mui/material'
import { StyledTableCell } from '../../../Common/Components/StyledTableComponents/styledTableCell'
import s from '../main.module.css'
import {
  addNewPackTC,
  getPacksDataTC,
  setPacksChooseAC,
  setPageAC,
  setPageCountAC,
  setSearchAC,
  setSearchParamsCardsCountAC,
} from './packsListReducer'
import { useAppDispatch, UseAppSelector } from '../../../App/store'
import { TablePaginationCustom } from '../../../Common/Components/TablePagination/tablePaginationCustom'
import { PacksListTableRow } from './packsListTableRow'
import Slider from '@mui/material/Slider'
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff'
import { AddPackModal } from '../../../Common/Components/BasicModals/AddPackModal/addPackModal'
import { CardsPackType } from '../../../API/CardsApi/cardsApi'

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

  const searchParamsMin = UseAppSelector((state) => state.packsList.searchParams.min)
  const searchParamsMax = UseAppSelector((state) => state.packsList.searchParams.max)

  useEffect(() => {
    dispatch(getPacksDataTC())
  }, [page, pageCount, packsChoose, searchVal, dispatch, searchParamsMin, searchParamsMax])

  const handleAddNewPack = (data: CardsPackType) => {
    dispatch(addNewPackTC({ ...data }))
  }

  const handleSetPage = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(setPageAC(value))
  }

  const handleSetPageCount = (event: SelectChangeEvent) => {
    dispatch(setPageCountAC(+event.target.value))
  }

  const mappedPacks = cardPacks.map((packData) => {
    return <PacksListTableRow key={packData._id} packData={packData} />
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

  useEffect(() => {
    setSliderValue([minCardsCount, maxCardsCount])
  }, [maxCardsCount, minCardsCount, packsChoose])

  const [sliderValue, setSliderValue] = useState<number[]>([minCardsCount, maxCardsCount])

  const handleSetRangeSliderValue = (
    event: Event | SyntheticEvent<Element, Event>,
    value: number | number[],
  ) => {
    if (Array.isArray(value)) {
      const maxValue: number = value[1]
      const minValue: number = value[0]
      dispatch(setSearchParamsCardsCountAC({ max: maxValue, min: minValue }))
    }
  }

  const hanldeChangeSlider = (event: Event, value: number | number[]) => {
    if (Array.isArray(value)) {
      setSliderValue(value)
    }
  }

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = pageCount - cardPacks.length
  const currentEmptyRows = emptyRows > 0 && (
    <TableRow style={{ height: 53 * emptyRows }}>
      <StyledTableCell colSpan={6} />
    </TableRow>
  )

  return (
    <div>
      <div className={s.wrapper}>
        <div className={s.title}>
          <h2>Packs list</h2>
          <AddPackModal title={'Add new pack'} callback={handleAddNewPack} />
        </div>
        <div className={s.toolbar}>
          <div className={s.searchbar}>
            <TableSearchBar onChange={hanldeSetSearchValue} />
          </div>
          <FormControl variant="standard">
            <FormLabel component="legend" sx={{ color: '#000000', marginBottom: '9px' }}>
              Show packs cards
            </FormLabel>
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
          </FormControl>
          <Box sx={{ width: 300 }}>
            <Typography id="input-slider" gutterBottom align={'left'}>
              Number of cards
            </Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <OutlinedInput
                  value={sliderValue[0]}
                  sx={{ width: 60 }}
                  size="small"
                  inputProps={{
                    step: 1,
                    min: minCardsCount,
                    max: maxCardsCount,
                    type: 'number',
                    'aria-labelledby': 'input-slider',
                  }}
                />
              </Grid>
              <Grid item xs>
                <Slider
                  value={sliderValue}
                  max={maxCardsCount}
                  min={minCardsCount}
                  onChange={hanldeChangeSlider}
                  onChangeCommitted={handleSetRangeSliderValue}
                  aria-labelledby="input-slider"
                />
              </Grid>
              <Grid item>
                <OutlinedInput
                  value={sliderValue[1]}
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
          <Tooltip title="clear filters">
            <IconButton
              sx={{
                background: '#FFFFFF',
                border: '1px solid #E8E8E8',
                borderRadius: '2px',
                width: '50px',
                height: '50px',
              }}
            >
              <FilterAltOffIcon />
            </IconButton>
          </Tooltip>
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
            <TableBody>
              {mappedPacks}
              {currentEmptyRows}
            </TableBody>
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
