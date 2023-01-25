import React from 'react';
import {BasicModal} from "../basicModal";

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
            <div>
                <h2>{props.title}</h2>
                <p>Do you really want to delete {props.name} ?</p>
                <button onClick={deleteHandler}>Delete</button>
            </div>
        </BasicModal>
    );
};