import React, {ChangeEvent, FC} from 'react'
import {
  FormControl,
  InputLabel,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material'
import Select from '@mui/material/Select'
import {AddPicture} from "../../../../Common/Components/BasicModals/AddCardModal/AddPicture/addPicture";
import {TextFields} from "../TextFields/textFields";

type BasicCardFormType = {
  onClose: () => void
  question: string
  answer: string
  buttonText: string
  onChange: () => void
  onChangeQuestion: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onChangeAnswer: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const BasicCardForm: FC<BasicCardFormType> = ({ question, answer, onChange, onClose, onChangeAnswer, onChangeQuestion}) => {

  console.log(question, answer)
  const [item, setItem] = React.useState('')

  const handleSelectItem = (event: SelectChangeEvent) => {
    setItem(event.target.value.toString())
  }

  return (
    <>
      <FormControl fullWidth sx={{marginTop: '20px'}}>
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
          <TextFields buttonText={'Save'}
                      onChange={onChange}
                      question={question}
                      answer={answer}
                      onChangeQuestion={onChangeQuestion}
                      onChangeAnswer={onChangeAnswer}
          />
        </>
      ) : (
        <>
          <AddPicture onChange={onChange}
                      onClose={onClose}
                      buttonText={'Upload question'}
                      questionImg={''}/>
        </>
      )}
    </>
  )
}

