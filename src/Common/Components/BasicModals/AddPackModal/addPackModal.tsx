import React from 'react'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import SuperButton from '../../SuperButton/superButton'
import {Button, TextField} from "@mui/material";
import {Title} from "../../Title/title";
import stylePack from "./addPackModal.module.css";


export const AddPackModal = (props: AddModalType) => {
  const [open, setOpen] = React.useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [inputValue, setInputValue] = React.useState('')

  const handleChangeInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value)
  }
  const handleButtonSubmit = () => {
    props.callback(inputValue)
    handleClose()
    setInputValue('')
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
          <div className={stylePack.packBlock}>
            <div className={stylePack.title}>
              <Title title={props.title}/>
            </div>
            <TextField
                fullWidth
                value={inputValue}
                onChange={handleChangeInputValue}
                id="standard-basic"
                label="Name pack"
                variant="standard"
            />
            <div className={stylePack.buttonBlock}>
              <Button sx={styleButton} onClick={handleButtonSubmit}>Save</Button>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  )
}

type AddModalType = {
  title: string
  callback: (newValue: string) => void
}
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const styleButton = {
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
