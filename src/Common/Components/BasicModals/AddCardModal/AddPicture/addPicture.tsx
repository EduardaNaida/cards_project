import React, { ChangeEvent, FC } from 'react'
import { Button, TextField } from '@mui/material'
import { uploadImg } from '../../../../../utils/InputTypeFile/InputTypeFile'
import { NewCardType } from '../../../../../Features/Main/MyPack/myPack'
import style from './addPicture.module.css'

type AddPictureType = {
  onChange: (data: NewCardType) => void
  onClose: () => void
  buttonText: string
  question: string
  answer: string
  onChangeQuestion: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onChangeAnswer: (event: React.ChangeEvent<HTMLInputElement>) => void
}
export const AddPicture: FC<AddPictureType> = ({ onChange, onClose, buttonText, ...props }) => {
  const [questionImg, setQuestionImg] = React.useState<string | undefined>(props.question)
  const [answer, setNewAnswer] = React.useState<string | undefined>(undefined)

  const onChangeQuestion = (e: ChangeEvent<HTMLInputElement>) => {
    uploadImg(e, setQuestionImg)
  }

  const handleChangeAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewAnswer(event.currentTarget.value)
  }

  const handleButtonSubmit = () => {
    onChange({ questionImg, answer })
    onClose()
  }

  return (
    <div className={style.pictureBlock}>
      <div className={style.input}>
        <label>
          <input type="file" onChange={onChangeQuestion} style={{ display: 'none' }} />
          <Button variant="contained" component="span">
            {buttonText}
          </Button>
          <div className={style.uploadPicture}>
            {questionImg && <img src={questionImg} alt="image" className={style.image} />}
          </div>
        </label>
      </div>
      <div className={style.answerBlock}>
        <TextField
          fullWidth
          value={answer}
          onChange={handleChangeAnswer}
          id="standard-basic"
          label="Answer"
          variant="standard"
        />
      </div>
      <div className={style.buttonBlock}>
        <Button sx={styleButton} onClick={handleButtonSubmit}>
          Save
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
