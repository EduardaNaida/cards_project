import React from 'react'
import { BasicModal } from '../basicModal'
import style from './deleteModal.module.css'
import { Button } from '@mui/material'

type DeleteModalType = {
  text: string
  callback: (id: string) => void
  id: string
  name: string
}

export const DeleteModal = (props: DeleteModalType) => {

  const deleteHandler = () => {
    props.callback(props.id)
  }
  return (
    <BasicModal type={'delete'}>
      <div className={style.deleteBlock}>
        <div className={style.description}>
          <div className={style.title}>
            <p>{props.text}</p>
          </div>
          <div className={style.question}>
            <p>
              Do you really want to delete<span> {props.name}</span>?
            </p>
          </div>
        </div>
        <div className={style.buttonBlock}>
          <Button onClick={deleteHandler} sx={styleButton}>
            Delete
          </Button>
        </div>
      </div>
    </BasicModal>
  )
}

const styleButton = {
  bgcolor: '#FF3636',
  color: 'white',
  borderRadius: 30,
  width: 111,
  height: 36,
  fontSize: 15,
  fontFamily: `'Montserrat', sans-serif`,
  textTransform: 'none',
  '&:hover': {
    color: '#FF3636',
  },
}
