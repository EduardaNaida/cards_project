import React, { ChangeEvent, FC } from 'react'
import { BasicModal } from '../basicModal'
import { useAppDispatch } from '../../../../App/store'
import { updateCardsTC } from '../../../../Features/Main/MyPack/cardReducer'
import { BasicCardForm } from '../../../../Features/Main/Cards/BasicCardForm/basicCardForm'
import { NewCardType } from '../../../../Features/Main/MyPack/myPack'
import style from '../EditModal/editModal.module.css'

type EditCardModalType = {
  text: string
  handleClose: () => void
  id: string
  question: string
  answer: string
  onChangeQuestion: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onChangeAnswer: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const EditCardModal: FC<EditCardModalType> = ({
  text,
  answer,
  id,
  question,
  handleClose,
  onChangeQuestion,
  onChangeAnswer,
}) => {
  const dispatch = useAppDispatch()

  const handleEditCard = (data: NewCardType) => {
    dispatch(
      updateCardsTC({
        _id: id,
        question: data.question,
        answer: data.answer,
        questionImg: data.questionImg,
      }),
    )
  }

  return (
    <BasicModal type={'edit'}>
      <div>
        <div className={style.title}>
          <p>{text}</p>
        </div>
        <BasicCardForm
          onClose={handleClose}
          question={question}
          answer={answer}
          buttonText={'Change question'}
          onSubmit={handleEditCard}
          onChangeQuestion={onChangeQuestion}
          onChangeAnswer={onChangeAnswer}
        />
      </div>
    </BasicModal>
  )
}
