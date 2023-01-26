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
import { Rating, SelectChangeEvent } from '@mui/material'
import { useParams } from 'react-router-dom'
import style from './myPack.module.css'
import { TableSearchBar } from '../../../Common/Components/TableSearchbar/tableSearchbar'
import { Title } from '../../../Common/Components/Title/title'
import { TablePaginationCustom } from '../../../Common/Components/TablePagination/tablePaginationCustom'
import { AddPackModal } from '../../../Common/Components/BasicModals/AddPackModal/addPackModal'
import { EditModal } from '../../../Common/Components/BasicModals/EditModal/editModal'
import { DeleteModal } from '../../../Common/Components/BasicModals/DeleteModal/deleteModal'
import { NavToMain } from '../../../Common/Components/NavToMain/navToMain'
import { AddCardModal } from '../../../Common/Components/BasicModals/AddCardModal/addCardModal'

export const MyPack = () => {
  const dispatch = AppDispatch()
  const { packId } = useParams()

  const [value, setValue] = useState<number | null>()

  const page = UseAppSelector((state) => state.cards.page)
  const pageCount = UseAppSelector((state) => state.cards.pageCount)
  const cardTotalCount = UseAppSelector((state) => state.cards.cardsTotalCount)
  const cards = UseAppSelector((state) => state.cards.cards)
  const cardQuestion = UseAppSelector((state) => state.cards.cardQuestion)
  const cardAnswer = UseAppSelector((state) => state.cards.cardAnswer)

  useEffect(() => {
    if (packId) {
      dispatch(getCardsTC(packId))
    }
  }, [dispatch, packId, page, pageCount, cardQuestion, cardAnswer])

  const handleSetPage = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(setCardsPageAC(value))
  }

  const handleSetPageCount = (event: SelectChangeEvent) => {
    dispatch(setCardsPageCountAC(+event.target.value))
  }

  const addCard = (newQuestion: string, newAnswer: string) => {
    if (packId) {
      dispatch(
        addCardsTC({
          cardsPack_id: packId,
          question: newQuestion,
          answer: newAnswer,
        }),
      )
    }
  }

  const removeCard = (id: string) => {
    dispatch(removeCardsTC(id))
  }
  // const updateCard = (id: string) => {
  //   dispatch(updateCardsTC({ _id: id, question: 'hwwwwwww' }))
  // }

  const searchHandler = (value: string) => {
    dispatch(setSearchCardAC(value))
  }

  return (
    <div className={style.container}>
      <NavToMain />
      <div className={style.main}>
        <Title title={'My pack'} />
        <AddCardModal title={'Add new card'} callback={addCard} />
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
                        <EditModal
                          name={cards.question}
                          answer={cards.answer}
                          text={'Edit Card'}
                          callback={() => {}}
                          id={cards._id}
                          type={'card'}
                        />
                        <DeleteModal
                          name={cards.question}
                          text={'Delete Card'}
                          callback={removeCard}
                          id={cards._id}
                        />
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
