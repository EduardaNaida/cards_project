import React, { useEffect, useState } from 'react'
import {
  addCardsTC,
  getCardsTC,
  removeCardsTC,
  setCardsPageAC,
  setCardsPageCountAC,
  setSearchCardAC,
  updateCardsTC,
} from './cardReducer'
import { AppDispatch, UseAppSelector } from '../../../App/store'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { StyledTableCell } from '../../../Common/Components/StyledTableComponents/styledTableCell'
import { formatingDate } from '../../../utils/formatDate'
import { IconButton, Rating, SelectChangeEvent } from '@mui/material'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { useNavigate, useParams } from 'react-router-dom'
import SuperButton from '../../../Common/Components/SuperButton/superButton'
import style from './myPack.module.css'
import { TableSearchBar } from '../../../Common/Components/TableSearchbar/tableSearchbar'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import { Title } from '../../../Common/Components/Title/title'
import { TablePaginationCustom } from '../../../Common/Components/TablePagination/tablePaginationCustom'
import {AddModal} from "../../../Common/Components/BasicModals/AddModal/addModal";

export const MyPack = () => {
  const dispatch = AppDispatch()
  const { packId } = useParams()
  const navigate = useNavigate()

  const [value, setValue] = useState<number | null>()

  const page = UseAppSelector((state) => state.cards.page)
  const pageCount = UseAppSelector((state) => state.cards.pageCount)
  const cardTotalCount = UseAppSelector((state) => state.cards.cardsTotalCount)
  const cards = UseAppSelector((state) => state.cards.cards)
  const cardQuestion = UseAppSelector((state) => state.cards.cardQuestion)

  useEffect(() => {
    if (packId) {
      dispatch(getCardsTC(packId))
    }
  }, [dispatch, packId, page, pageCount, cardQuestion])

  const handleSetPage = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(setCardsPageAC(value))
  }

  const handleSetPageCount = (event: SelectChangeEvent) => {
    dispatch(setCardsPageCountAC(+event.target.value))
  }

  const addCard = () => {
    if (packId) {
      dispatch(
        addCardsTC({
          cardsPack_id: packId,
          question: 'Whats your name?',
          answer: 'Anna',
        }),
      )
    }
  }

  const removeCard = (id: string) => {
    dispatch(removeCardsTC(id))
  }
  const updateCard = (id: string) => {
    dispatch(updateCardsTC({ _id: id, question: 'hwwwwwww' }))
  }

  const searchHandler = (value: string) => {
    dispatch(setSearchCardAC(value))
  }

  return (
    <div className={style.container}>
      <IconButton
        sx={{ display: 'flex', justifyContent: 'flex-start', color: 'black' }}
        onClick={() => {
          navigate('/packs-list')
        }}
      >
        <KeyboardBackspaceIcon />
        <p className={style.text}>Back to Packs List</p>
      </IconButton>
      <div className={style.main}>
        <Title title={'My pack'} />
        <AddModal title={'Add new card'} callback={addCard}/>
      </div>
      {cards.length === 0 ? (
        <div>My pack is empty</div>
      ) : (
        <div className={style.tableContainer}>
          <TableSearchBar onChange={searchHandler} />
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Question</StyledTableCell>
                  <StyledTableCell align="right">Answer</StyledTableCell>
                  <StyledTableCell align="right">Last Updated</StyledTableCell>
                  <StyledTableCell align="center">Grade</StyledTableCell>
                  <StyledTableCell align="right"></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cards.map((cards) => {
                  const formattedDate = formatingDate(cards.updated)
                  return (
                    <TableRow key={cards._id}>
                      <StyledTableCell component="th" scope="row">
                        {cards.question}
                      </StyledTableCell>
                      <StyledTableCell align="right">{cards.answer}</StyledTableCell>
                      <StyledTableCell align="right">{formattedDate}</StyledTableCell>
                      <StyledTableCell align="right">
                        <Rating
                          name="simple-controlled"
                          value={cards.grade}
                          onChange={(event, newValue) => {
                            setValue(newValue)
                          }}
                        />
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <IconButton
                          onClick={() => {
                            updateCard(cards._id)
                          }}
                        >
                          <BorderColorIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            removeCard(cards._id)
                          }}
                        >
                          <DeleteForeverIcon />
                        </IconButton>
                      </StyledTableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePaginationCustom
            pageCount={pageCount}
            totalCountItems={cardTotalCount}
            handleSetPage={handleSetPage}
            handleSetPageCount={handleSetPageCount}
            page={page}
          />
        </div>
      )}
    </div>
  )
}
