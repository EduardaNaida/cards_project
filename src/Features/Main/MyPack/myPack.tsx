import React, { ChangeEvent, useEffect, useState } from 'react'
import {
  addCardsTC,
  getCardsTC,
  removeCardsTC,
  setCardsPageAC,
  setCardsPageCountAC,
  setSearchCardAC,
  updateGradeTC,
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
import { EditModal } from '../../../Common/Components/BasicModals/EditModal/editModal'
import { DeleteModal } from '../../../Common/Components/BasicModals/DeleteModal/deleteModal'
import { NavToMain } from '../../../Common/Components/NavToMain/navToMain'
import { AddCardModal } from '../../../Common/Components/BasicModals/AddCardModal/addCardModal'
import { EditCardModal } from '../../../Common/Components/BasicModals/EditCardModal/editCardModal'

export type NewCardType = {
  answer?: string
  question?: string
  questionImg?: string
  answerImg?: string
}

export const MyPack = () => {
  const dispatch = AppDispatch()
  const { packId } = useParams()

  const [value, setValue] = useState<number | null>()

  const page = UseAppSelector((state) => state.cards.page)
  const pageCount = UseAppSelector((state) => state.cards.pageCount)
  const cardTotalCount = UseAppSelector((state) => state.cards.cardsTotalCount)
  const cards = UseAppSelector((state) => state.cards.cards)

  const [question, setNewQuestion] = React.useState<string>('')
  const [answer, setNewAnswer] = React.useState<string>('')

  useEffect(() => {
    if (packId) {
      dispatch(getCardsTC(packId))
    }
  }, [dispatch, packId, page, pageCount, question, answer])

  const handleSetPage = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(setCardsPageAC(value))
  }

  const handleSetPageCount = (event: SelectChangeEvent) => {
    dispatch(setCardsPageCountAC(+event.target.value))
  }

  const addCard = (data: NewCardType) => {
    if (packId) {
      dispatch(addCardsTC({ ...data }, packId))
    }
    setNewAnswer('')
    setNewQuestion('')
  }

  const removeCard = (id: string) => {
    dispatch(removeCardsTC(id))
  }

  const searchHandler = (value: string) => {
    dispatch(setSearchCardAC(value))
  }

  const updateGrade = (grade: number | null, card_id: string) => {
    dispatch(updateGradeTC(grade, card_id))
  }

  const handleChangeQuestion = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewQuestion(event.currentTarget.value)
  }

  const handleChangeAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewAnswer(event.currentTarget.value)
  }

  return (
    <div className={style.container}>
      <NavToMain />
      <div className={style.main}>
        <Title title={'My pack'} />
        <AddCardModal
          title={'Add new card'}
          onChange={addCard}
          question={question}
          answer={answer}
          onChangeQuestion={handleChangeQuestion}
          onChangeAnswer={handleChangeAnswer}
        />
      </div>
      {cards.length === 0 ? (
        <div>My pack is empty</div>
      ) : (
        <div className={style.tableContainer}>
          <TableSearchBar onChange={searchHandler} />
          <TableContainer component={Paper} sx={{ marginTop: '24px' }}>
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
                        {cards.questionImg ? (
                          <img
                            src={cards.questionImg}
                            alt="img"
                            style={{ maxHeight: '150px', maxWidth: '100%' }}
                          />
                        ) : (
                          cards.question
                        )}
                      </StyledTableCell>
                      <StyledTableCell align="right">{cards.answer}</StyledTableCell>
                      <StyledTableCell align="right">{formattedDate}</StyledTableCell>
                      <StyledTableCell align="right">
                        <Rating
                          name="simple-controlled"
                          value={cards.grade}
                          onChange={(event, newValue) => {
                            setValue(newValue)
                            updateGrade(newValue, cards._id)
                          }}
                        />
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <EditCardModal
                          question={cards.questionImg ? cards.questionImg : cards.question}
                          answer={cards.answer}
                          text={'Edit Card'}
                          id={cards._id}
                          handleClose={() => {}}
                          onChangeQuestion={handleChangeQuestion}
                          onChangeAnswer={handleChangeAnswer}
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
