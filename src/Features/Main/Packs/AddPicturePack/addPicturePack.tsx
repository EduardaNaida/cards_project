import React, { ChangeEvent, FC } from 'react'
import { Button, TextField } from '@mui/material'
import style from './addPicturePack.module.css'
import { uploadImg } from '../../../../utils/InputTypeFile/InputTypeFile'
import { CardsPackType } from '../../../../API/CardsApi/cardsApi'

type AddPicturePackType = {
  onChange: (data: CardsPackType) => void
  onClose: () => void
  buttonText: string
  packName: string
  onChangeName: (event: ChangeEvent<HTMLInputElement>) => void
}
export const AddPicturePack: FC<AddPicturePackType> = ({
  onChange,
  onClose,
  buttonText,
  packName,
  onChangeName,
  ...props
}) => {
  const [image, setImage] = React.useState<string | undefined>(undefined)

  const onChangePackName = (e: ChangeEvent<HTMLInputElement>) => {
    uploadImg(e, setImage)
  }

  const handleButtonSubmit = () => {
    onChange({ deckCover: image, name: packName })
    onClose()
  }

  const deletePicture = () => {
    setImage('')
  }

  return (
    <div className={style.pictureBlock}>
      <div className={style.input}>
        <label>
          <input type="file" onChange={onChangePackName} style={{ display: 'none' }} />
          <div className={style.buttonBlock}>
            <Button variant="outlined" component="span">
              {buttonText}
            </Button>
          </div>
        </label>
        <div className={style.uploadPicture}>
          {image && (
            <div>
              <img src={image} alt="image" className={style.image} />
              <Button onClick={deletePicture}>Delete cover</Button>
            </div>
          )}
        </div>
      </div>
      <div className={style.inputBlock}>
        <TextField
          fullWidth
          id="standard-basic"
          label="Pack name"
          variant="standard"
          value={packName}
          onChange={onChangeName}
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
