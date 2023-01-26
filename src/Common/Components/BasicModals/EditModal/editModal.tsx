import React from 'react'
import {BasicModal} from '../basicModal'
import SuperCheckbox from '../../SuperCheckbox/superCheckbox'
import style from './editModal.module.css'
import {Box, Button, FormControl, Input, InputLabel, TextField} from '@mui/material'
import {useFormik} from 'formik'
import {updatePackTC} from '../../../../Features/Main/PacksList/packsListReducer'
import {useAppDispatch} from '../../../../App/store'
import {updateCardsTC} from "../../../../Features/Main/MyPack/cardReducer";

type EditModalType = {
    text: string
    callback: (id: string) => void
    id: string
    name: string
    type: string
    answer?: string
}

export const EditModal = (props: EditModalType) => {
    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            name: '' || props.name,
            type: '' || props.type,
            answer: '' || props.answer
        },
        onSubmit: (values) => {
            if (values.type === 'pack') {
                dispatch(updatePackTC({_id: props.id, name: values.name}))
            } else {
                dispatch(updateCardsTC({ _id: props.id, question: values.name, answer: values.answer}))
            }
        },
    })

    return (
        <BasicModal type={'edit'}>
            <div className={style.editBlock}>
                <Box component="form" onSubmit={formik.handleSubmit} className={style.editBlock}>
                    {props.type === 'pack' ? (
                        <div className={style.editPackBlock}>
                            <div className={style.title}>
                                <p>{props.text}</p>
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
                    ) : (
                        <>
                            <div className={style.editCardBlock}>
                                <div className={style.title}>
                                    <p>{props.text}</p>
                                </div>
                                <div className={style.inputBlock}>
                                    <FormControl sx={{width: '100% '}} variant="standard" fullWidth>
                                        <TextField
                                            fullWidth
                                            value={formik.values.name}
                                            onChange={formik.handleChange}
                                            id="standard-basic"
                                            label="Question"
                                            name="name"
                                            variant="standard"
                                        />
                                        <TextField
                                            fullWidth
                                            value={formik.values.answer}
                                            onChange={formik.handleChange}
                                            id="standard-basic"
                                            label="Answer"
                                            name="answer"
                                            variant="standard"
                                        />
                                    </FormControl>
                                </div>
                            </div>
                        </>
                    )}
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
