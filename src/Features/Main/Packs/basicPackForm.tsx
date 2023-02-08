import React, { ChangeEvent, FC } from 'react'
import { FormControl, InputLabel, MenuItem, SelectChangeEvent } from '@mui/material'
import Select from '@mui/material/Select'
import { TextFieldPack } from './TextFieldPack/textFieldPack'
import { AddPicturePack } from './AddPicturePack/addPicturePack'
import { CardsPackType } from '../../../API/CardsApi/cardsApi'

type BasicPackFormType = {
  onClose: () => void
  packName: string
  buttonText: string
  onSubmit: (data: CardsPackType) => void
  onChangeName: (event: ChangeEvent<HTMLInputElement>) => void
}

export const BasicPackForm: FC<BasicPackFormType> = ({
  packName,
  onClose,
  onChangeName,
  onSubmit,
  buttonText,
}) => {
  const [item, setItem] = React.useState('text')

  const handleSelectItem = (event: SelectChangeEvent) => {
    setItem(event.target.value.toString())
  }

  return (
    <>
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

      {item === 'picture' && (
        <AddPicturePack
          onChange={onSubmit}
          onClose={onClose}
          buttonText={'Change cover'}
          packName={packName}
        />
      )}

      {item === 'text' && (
        <TextFieldPack
          buttonText={buttonText}
          onChange={onSubmit}
          packName={packName}
          onClose={onClose}
          onChangeName={onChangeName}
        />
      )}
    </>
  )
}
