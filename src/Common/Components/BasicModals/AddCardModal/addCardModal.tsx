import React from 'react'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import SuperButton from '../../SuperButton/superButton'
import { Button, TextField } from '@mui/material'
import { Title } from '../../Title/title'
import styleCard from './addCardModal.module.css'
import CloseIcon from '@mui/icons-material/Close'

export const AddCardModal = (props: AddCardModalType) => {
  const [open, setOpen] = React.useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [newQuestion, setNewQuestion] = React.useState('')
  const [newAnswer, setNewAnswer] = React.useState('')

  const handleChangeQuestion = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewQuestion(event.currentTarget.value)
  }
  const handleChangeAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewAnswer(event.currentTarget.value)
  }
  const handleButtonSubmit = () => {
    props.callback(newQuestion, newAnswer)
    handleClose()
    setNewQuestion('')
    setNewAnswer('')
  }
  return (
    <>
      <SuperButton onClick={handleOpen}>{props.title}</SuperButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className={styleCard.cardBlock}>
            <div className={styleCard.title}>
              <Title title={props.title} />
              <CloseIcon fontSize={'medium'} onClick={handleClose} />
            </div>
            <TextField
              fullWidth
              value={newQuestion}
              onChange={handleChangeQuestion}
              id="standard-basic"
              label="Question"
              variant="standard"
            />
            <TextField
              fullWidth
              value={newAnswer}
              onChange={handleChangeAnswer}
              id="standard-basic"
              label="Answer"
              variant="standard"
            />
            <div className={styleCard.buttonBlock}>
              <Button sx={styleButton} onClick={handleButtonSubmit}>
                Save
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  )
}

type AddCardModalType = {
  title: string
  callback: (newQuestion: string, newAnswer: string) => void
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

const styleButton = {
  display: 'flex',
  bgcolor: '#366EFF',
  color: 'white',
  borderRadius: 30,
  width: 111,
  height: 36,
  fontSize: 15,
  fontFamily: `'Montserrat', sans-serif`,
  textTransform: 'none',
  '&:hover': {
    color: '#366EFF',
  },
}
