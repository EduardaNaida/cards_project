import React from 'react';
import {BasicModal} from "../basicModal";
import SuperCheckbox from "../../SuperCheckbox/superCheckbox";
import style from "./editModal.module.css";
import {Box, Button, FormControl, Input, InputLabel} from "@mui/material";
import {useFormik} from "formik";
import {updatePackTC} from "../../../../Features/Main/PacksList/packsListReducer";
import {useAppDispatch} from "../../../../App/store";

type EditModalType = {
    text: string
    callback: (id: string) => void
    id: string
    name: string
    type: string
}

export const EditModal = (props: EditModalType) => {

    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            name: '',
            type: ''
        },
        onSubmit: (values) => {
            dispatch(updatePackTC({_id: props.id, name: values.name}))
        },
    })


    return (
        <BasicModal type={'edit'}>
            <div className={style.editBlock}>
                <Box
                    component="form"
                    onSubmit={formik.handleSubmit}
                    className={style.editBlock}
                >
                    {props.type === 'pack' ? (
                        <div className={style.editPackBlock}>
                            <div className={style.title}>
                                <p>{props.text}</p>
                            </div>
                            <div className={style.inputBlock}>
                                <FormControl sx={{width: '100% '}} variant="standard" fullWidth>
                                    <InputLabel htmlFor="text">{props.name}</InputLabel>
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
                            <p>{props.name}</p>
                            {/*<div className={style.title}>*/}
                            {/*    <p>{props.text}</p>*/}
                            {/*</div>*/}
                            {/*<div className={style.inputBlock}>*/}
                            {/*    <FormControl>*/}
                            {/*        <InputLabel htmlFor="question">Question</InputLabel>*/}
                            {/*        <Input/>*/}
                            {/*    </FormControl>*/}
                            {/*    <FormControl>*/}
                            {/*        <InputLabel htmlFor="answer">Answer</InputLabel>*/}
                            {/*        <Input/>*/}
                            {/*    </FormControl>*/}
                            {/*</div>*/}
                        </>

                    )}
                    <div className={style.checkbox}>
                        <SuperCheckbox>Private</SuperCheckbox>
                    </div>
                    <div className={style.buttonBlock}>
                        <Button type="submit" sx={styleButton}>Save</Button>
                    </div>
                </Box>
            </div>
        </BasicModal>
    );
};

const styleButton = {
    bgcolor: '#366EFF',
    color: "white",
    borderRadius: 30,
    width: 111,
    height: 36,
    fontSize: 15,
    fontFamily: `'Montserrat', sans-serif`,
    textTransform: 'none',
    "&:hover": {
        color: '#366EFF',
    }
};