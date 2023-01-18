import React, { useEffect, useState } from 'react'
import { TableSearchBar } from '../../../Common/Components/TableSearchbar/tableSearchbar'
import { CardPacksUpdateType, packAPI } from '../../../API/CardsApi/cardsApi'
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { StyledTableCell } from '../../../Common/Components/StyledTableComponents/styledTableCell'
import { formatingDate } from '../../../utils/formatDate'
import s from '../Main.module.css'
import SchoolIcon from '@mui/icons-material/School'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

export const PacksList = () => {
  const [test, setTest] = useState('')
  const [rows, setRows] = useState<CardPacksUpdateType[] | []>([])
  useEffect(() => {
    packAPI.getPack().then((res) => {
      setRows(res.data.cardPacks)
      console.log(res.data.cardPacks)
    })
  }, [])

  return (
    <div>
      <div className={s.wrapper}>
        <TableSearchBar onChange={setTest} />
        {test}
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
              {rows.map((row) => {
                const formattedDate = formatingDate(row.updated)
                return (
                  <TableRow key={row.name}>
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
                      <IconButton>
                        <BorderColorIcon />
                      </IconButton>
                      <IconButton>
                        <DeleteForeverIcon />
                      </IconButton>
                    </StyledTableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
}
