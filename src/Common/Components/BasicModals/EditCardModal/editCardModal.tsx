import React, { FC } from 'react'
import { BasicModal } from '../basicModal'
import SuperCheckbox from '../../SuperCheckbox/superCheckbox'
import style from './editModal.module.css'
import { Box, Button, FormControl, Input, InputLabel, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { updatePackTC } from '../../../../Features/Main/PacksList/packsListReducer'
import { useAppDispatch } from '../../../../App/store'
import { updateCardsTC } from '../../../../Features/Main/MyPack/cardReducer'
import { AddPicture } from '../AddCardModal/AddPicture/addPicture'
import { BasicCardForm } from '../../../../Features/Main/Cards/BasicCardForm/basicCardForm'
import { NewCardType } from '../../../../Features/Main/MyPack/myPack'

type EditCardModalType = {
  text: string
  onClose: () => void
  // callback: (id: string) => void
  id: string
  question: string
  answer: string
}

export const EditCardModal: FC<EditCardModalType> = ({ text, answer, id, question, onClose }) => {
  const dispatch = useAppDispatch()

  // const formik = useFormik({
  //   initialValues: {
  //     name: '' || props.name,
  //     questionImg: '' || props.questionImg,
  //     answer: '' || props.answer,
  //   },
  //   onSubmit: (values) => {
  //     dispatch(updateCardsTC({_id: props.id, question: values.name, answer: values.answer}))
  //   },
  // })

  const handleEditCard = (data: NewCardType) => {}

  return (
    <div>[</div>
    // <BasicCardForm onClose={onClose} question={question} answer={answer} buttonText={'Save'}
    //                onChange={handleEditCard} onChangeQuestion={} onChangeAnswer={}/>
    // <BasicModal type={'edit'}>
    //   <div className={style.editBlock}>
    //     <Box component="form" onSubmit={formik.handleSubmit} className={style.editBlock}>
    //           <div className={style.editCardBlock}>
    //             <div className={style.title}>
    //               <p>{props.text}</p>
    //             </div>
    //             {formik.values.questionImg ?
    //               <div className={style.imageEditBlock}>
    //                 <div className={style.imageBlock}>
    //                   <img src={formik.values.questionImg} alt="image" className={style.image}/>
    //                 </div>
    //                 <AddPicture onChange={formik.handleChange}
    //                             onClose={formik.handleSubmit}
    //                             buttonText={'Change question'}
    //                 />
    //               </div>
    //               :
    //               <div className={style.inputBlock}>
    //                 <FormControl sx={{width: '100% '}} variant="standard" fullWidth>
    //                   <TextField
    //                     fullWidth
    //                     value={formik.values.name}
    //                     onChange={formik.handleChange}
    //                     id="standard-basic"
    //                     label="Question"
    //                     name="name"
    //                     variant="standard"
    //                   />
    //                   <TextField
    //                     fullWidth
    //                     value={formik.values.answer}
    //                     onChange={formik.handleChange}
    //                     id="standard-basic"
    //                     label="Answer"
    //                     name="answer"
    //                     variant="standard"
    //                   />
    //                 </FormControl>
    //               </div>
    //             }
    //           </div>
    //       <div className={style.checkbox}>
    //         <SuperCheckbox>Private</SuperCheckbox>
    //       </div>
    //       <div className={style.buttonBlock}>
    //         <Button type="submit" sx={styleButton}>
    //           Save
    //         </Button>
    //       </div>
    //     </Box>
    //   </div>
    // </BasicModal>
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
