import React, {ChangeEvent} from 'react'
import {BasicModal} from '../basicModal'
import SuperCheckbox from '../../SuperCheckbox/superCheckbox'
import style from './editModal.module.css'
import {Box, Button, FormControl, Input, InputLabel} from '@mui/material'
import {useFormik} from 'formik'
import {updatePackTC} from '../../../../Features/Main/PacksList/packsListReducer'
import {useAppDispatch} from '../../../../App/store'
import {uploadImg} from "../../../../utils/InputTypeFile/InputTypeFile";

type EditModalType = {
  callback: (id: string) => void
  id: string
  packName: string
  deckCover: string
  text: string
}

export const EditPackModal = (props: EditModalType) => {
  const dispatch = useAppDispatch()

  const [image, setImage] = React.useState<string | undefined>(props.deckCover)

  const onChangePackName = (e: ChangeEvent<HTMLInputElement>) => {
    uploadImg(e, setImage)
  }
  const deletePicture = () => {
    setImage('')
  }

  const formik = useFormik({
    initialValues: {
      name: '' || props.packName,
    },
    onSubmit: (values) => {
      dispatch(updatePackTC({_id: props.id, name: values.name, deckCover: image}))
    },
  })


  return (
    <BasicModal type={'edit'}>
      <div className={style.editBlock}>
        <Box component="form" onSubmit={formik.handleSubmit} className={style.editBlock}>
          <div className={style.editPackBlock}>
            <div className={style.title}>
              <p>{props.text}</p>
            </div>
              <div>
                <label>
                  <input type="file" onChange={onChangePackName} style={{display: 'none'}}/>
                  <div className={style.buttonBlock}>
                    <Button variant="outlined" component="span">Change cover</Button>
                  </div>
                </label>
                  <div className={style.uploadPicture}>
                    {image && <div>
                        <img src={image} alt="image" className={style.image}/>
                        <Button onClick={deletePicture}>Delete cover</Button>
                    </div>
                    }
                  </div>
              </div>

              <div className={style.inputBlock}>
                <FormControl sx={{width: '100% '}} variant="standard" fullWidth>
                  <InputLabel htmlFor="text">Pack name</InputLabel>
                  <Input
                    name={'name'}
                    type={'text'}
                    value={formik.values.name}
                    onChange={formik.handleChange}
                  />
                </FormControl>
              </div>
          </div>

          <div className={style.checkbox}>
            <SuperCheckbox>Private</SuperCheckbox>
          </div>
          <div className={style.buttonBlock}>
            <Button type="submit" sx={styleButton}>
              Save
            </Button>
          </div>
        </Box>
      </div>
    </BasicModal>
  )
}

const styleButton = {
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
