import React from 'react';
import {BasicModal} from "../basicModal";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {IconButton} from "@mui/material";

type DeleteModalType = {
    title: string
    callback: (id: string) => void
    id: string
}

export const DeleteModal = (props: DeleteModalType) => {

    const deleteHandler = () => {
      props.callback(props.id)
    }
    return (
        <BasicModal title={props.title}>
            <div>
                <p>Do you really want to delete {props.title} ?</p>
                <IconButton>
                    <DeleteForeverIcon onClick={deleteHandler} />
                    Delete
                </IconButton>
            </div>
        </BasicModal>
    );
};