import React, { ChangeEvent, FC } from 'react'
import { Button, TextField } from '@mui/material'
import style from './textFieldPack.module.css'

type TextFieldPackType = {
  packName: string
  buttonText: string
  onClose: () => void
  onChange: (data: {}) => void
  onChangeName: (event: ChangeEvent<HTMLInputElement>) => void
}
export const TextFieldPack: FC<TextFieldPackType> = ({
  buttonText,
  onChange,
  packName,
  onChangeName,
  onClose,
  ...props
}) => {
  const handleButtonSubmit = () => {
    onChange({ name: packName })
    onClose()
  }

  return (
    <div className={style.inputBlock}>
      <TextField
        fullWidth
        id="standard-basic"
        label="Pack name"
        variant="standard"
        value={packName}
        onChange={onChangeName}
      />

      <div className={style.buttonBlock}>
        <Button onClick={handleButtonSubmit} sx={styleButton}>
          {buttonText}
        </Button>
      </div>
    </div>
  )
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
