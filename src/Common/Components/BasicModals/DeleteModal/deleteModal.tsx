import React from 'react';
import {BasicModal} from "../basicModal";
import style from "./deleteModal.module.css";
import {Button} from "@mui/material";

type DeleteModalType = {
    title: string
    callback: (id: string) => void
    id: string
    name: string
}

export const DeleteModal = (props: DeleteModalType) => {

    const deleteHandler = () => {
      props.callback(props.id)
    }
    return (
        <BasicModal type={'delete'}>
            <div className={style.deleteBlock}>
                <div className={style.description}>
                    <div className={style.title}>
                        <p>{props.title}</p>
                    </div>
                    <div className={style.question}>
                        <p>Do you really want to delete<span> {props.name}</span>?</p>
                    </div>
                </div>
                <div className={style.buttonBlock}>
                    <Button onClick={deleteHandler} className={style.button}>Delete</Button>
                </div>
            </div>
        </BasicModal>
    );
};