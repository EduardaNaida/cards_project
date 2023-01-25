import React from 'react'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import SuperButton from '../../SuperButton/superButton'

type AddModalType = {
  title: string
  callback: () => void
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

export const AddModal = (props: AddModalType) => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
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
          <h2>{props.title}</h2>
          <input type="text" />
          <button onClick={props.callback}>Save</button>
        </Box>
      </Modal>
    </>
  )
}
