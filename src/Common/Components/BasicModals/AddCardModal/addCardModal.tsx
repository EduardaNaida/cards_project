import React, { ChangeEvent } from 'react'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import SuperButton from '../../SuperButton/superButton'
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  SelectChangeEvent,
  TextField,
} from '@mui/material'
import { Title } from '../../Title/title'
import styleCard from './addCardModal.module.css'
import CloseIcon from '@mui/icons-material/Close'
import Select from '@mui/material/Select'
import { AddPicture } from './AddPicture/addPicture'
import { NewCardType } from '../../../../Features/Main/MyPack/myPack'

export const AddCardModal = (props: AddCardModalType) => {
  const [open, setOpen] = React.useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [question, setNewQuestion] = React.useState('')
  const [answer, setNewAnswer] = React.useState('')
  const [item, setItem] = React.useState('')

  const handleSelectItem = (event: SelectChangeEvent) => {
    setItem(event.target.value.toString())
  }

  const handleChangeQuestion = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewQuestion(event.currentTarget.value)
  }

  const handleChangeAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewAnswer(event.currentTarget.value)
  }

  const handleButtonSubmit = () => {
    props.onChange({ question, answer })
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

            <FormControl fullWidth sx={{ marginTop: '20px' }}>
              <InputLabel id="demo-simple-select-label">Choose a question format</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Choose a question format"
                value={item}
                onChange={handleSelectItem}
                displayEmpty
              >
                <MenuItem value={'text'}>Text</MenuItem>
                <MenuItem value={'picture'}>Picture</MenuItem>
              </Select>
            </FormControl>

            {item === 'text' ? (
              <>
                <div>
                  <TextField
                    fullWidth
                    value={question}
                    onChange={handleChangeQuestion}
                    id="standard-basic"
                    label="Question"
                    variant="standard"
                    sx={{ height: '60px' }}
                  />
                  <TextField
                    fullWidth
                    value={answer}
                    onChange={handleChangeAnswer}
                    id="standard-basic"
                    label="Answer"
                    variant="standard"
                  />
                </div>
                <div className={styleCard.buttonBlock}>
                  <Button sx={styleButton} onClick={handleButtonSubmit}>
                    Save
                  </Button>
                </div>
              </>
            ) : (
              <>
                <AddPicture onChange={props.onChange} onClose={handleClose} />
              </>
            )}
          </div>
        </Box>
      </Modal>
    </>
  )
}

type AddCardModalType = {
  title: string
  onChange: (data: NewCardType) => void
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
