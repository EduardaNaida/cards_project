import React, { ChangeEvent, FC } from 'react'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import SuperButton from '../../SuperButton/superButton'
import { Title } from '../../Title/title'
import styleCard from './addCardModal.module.css'
import CloseIcon from '@mui/icons-material/Close'
import { NewCardType } from '../../../../Features/Main/MyPack/myPack'
import { BasicCardForm } from '../../../../Features/Main/Cards/BasicCardForm/basicCardForm'

type AddCardModalType = {
  title: string
  onChange: (data: NewCardType) => void
  question: string
  answer: string
  onChangeQuestion: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onChangeAnswer: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const AddCardModal: FC<AddCardModalType> = ({
  title,
  answer,
  question,
  onChange,
  onChangeAnswer,
  onChangeQuestion,
}) => {
  const [open, setOpen] = React.useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      <SuperButton onClick={handleOpen}>{title}</SuperButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className={styleCard.cardBlock}>
            <div className={styleCard.title}>
              <Title title={title} />
              <CloseIcon fontSize={'medium'} onClick={handleClose} />
            </div>
            <BasicCardForm
              onClose={handleClose}
              question={question}
              answer={answer}
              buttonText={'Upload question'}
              onSubmit={onChange}
              onChangeQuestion={onChangeQuestion}
              onChangeAnswer={onChangeAnswer}
            />
          </div>
        </Box>
      </Modal>
    </>
  )
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px',
  borderRadius: '2px',
  boxShadow: 24,
  p: 3,
}
