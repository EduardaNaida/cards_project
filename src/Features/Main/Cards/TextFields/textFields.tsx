import React, {ChangeEvent, FC} from 'react'
import {
  Button,
  TextField,
} from '@mui/material'
import styleCard from "../../../../Common/Components/BasicModals/AddCardModal/addCardModal.module.css";

type TextFieldsType = {
  question: string
  answer: string
  buttonText: string
  onChange: () => void
  onChangeQuestion: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onChangeAnswer: (event: React.ChangeEvent<HTMLInputElement>) => void
}
export const TextFields: FC<TextFieldsType> = ({
                                                 question,
                                                 answer,
                                                 buttonText,
                                                 onChange,
                                                 onChangeAnswer,
                                                 onChangeQuestion
                                               }) => {


  return (
    <div>
      <TextField
        fullWidth
        id="standard-basic"
        label="Question"
        variant="standard"
        sx={{height: '60px'}}
        defaultValue={question}
        onChange={onChangeQuestion}
      />
      <TextField
        fullWidth
        id="standard-basic"
        label="Answer"
        variant="standard"
        defaultValue={answer}
        onChange={onChangeAnswer}
      />
      <div className={styleCard.buttonBlock}>
        <Button onClick={onChange} sx={styleButton}>
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
