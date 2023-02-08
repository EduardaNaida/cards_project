import React, { ChangeEvent, FC } from 'react'
import { Button } from '@mui/material'
import style from './addPicturePack.module.css'
import { uploadImg } from '../../../../utils/InputTypeFile/InputTypeFile'
import { CardsPackType } from '../../../../API/CardsApi/cardsApi'

type AddPicturePackType = {
  onChange: (data: CardsPackType) => void
  onClose: () => void
  buttonText: string
  packName: string
}
export const AddPicturePack: FC<AddPicturePackType> = ({
  onChange,
  onClose,
  buttonText,
  packName,
  ...props
}) => {
  const [image, setImage] = React.useState<string | undefined>(undefined)

  const onChangePackName = (e: ChangeEvent<HTMLInputElement>) => {
    uploadImg(e, setImage)
  }

  const handleButtonSubmit = () => {
    onChange({ deckCover: image })
    onClose()
  }

  return (
    <div className={style.pictureBlock}>
      <div className={style.input}>
        <span className={style.text}>Pack name: </span>
        <label>
          <input type="file" onChange={onChangePackName} style={{ display: 'none' }} />
          <div className={style.buttonBlock}>
            <Button variant="outlined" component="span">
              {buttonText}
            </Button>
          </div>
          <div className={style.uploadPicture}>
            {image && <img src={image} alt="image" className={style.image} />}
          </div>
        </label>
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
