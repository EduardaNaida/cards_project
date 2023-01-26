import React, { FC } from 'react'
import { FormControl, MenuItem, Pagination, Select, SelectChangeEvent } from '@mui/material'
import s from './tablePagination.module.css'

type TablePaginationCustomPropsType = {
  page: number
  pageCount: number
  totalCountItems: number
  handleSetPage: (event: React.ChangeEvent<unknown>, value: number) => void
  handleSetPageCount: (event: SelectChangeEvent) => void
}

export const TablePaginationCustom: FC<TablePaginationCustomPropsType> = ({
  page,
  pageCount,
  totalCountItems,
  handleSetPage,
  handleSetPageCount,
}) => {
  return (
    <div className={s.pagination}>
      <Pagination
        count={Math.ceil(totalCountItems / pageCount)}
        page={page}
        onChange={handleSetPage}
      />
      Show
      <FormControl sx={{ m: 1, minWidth: 40, minHeight: 40 }}>
        <Select
          sx={{ padding: '0px' }}
          value={pageCount + ''}
          onChange={handleSetPageCount}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={7}>7</MenuItem>
          <MenuItem value={10}>10</MenuItem>
        </Select>
      </FormControl>
      Cards per Page
    </div>
  )
}
