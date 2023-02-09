import React from 'react'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import SuperButton from '../../SuperButton/superButton'
import { Title } from '../../Title/title'
import stylePack from './addPackModal.module.css'
import CloseIcon from '@mui/icons-material/Close'
import { BasicPackForm } from '../../../../Features/Main/Packs/basicPackForm'
import { CardsPackType } from '../../../../API/CardsApi/cardsApi'

export const AddPackModal = (props: AddPackModalType) => {
  const [open, setOpen] = React.useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [inputValue, setInputValue] = React.useState('')

  const handleChangeInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value)
  }
  const handleButtonSubmit = (data: CardsPackType) => {
    props.callback({ ...data })
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
              <Title title={props.title} />
              <CloseIcon fontSize={'medium'} onClick={handleClose} />
            </div>
            <BasicPackForm
              onClose={handleClose}
              packName={inputValue}
              buttonText={'Save'}
              onSubmit={handleButtonSubmit}
              onChangeName={handleChangeInputValue}
            />
          </div>
        </Box>
      </Modal>
    </>
  )
}

type AddPackModalType = {
  title: string
  callback: (data: CardsPackType) => void
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
