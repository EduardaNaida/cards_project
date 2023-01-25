import React from 'react';
import {BasicModal} from "../basicModal";
import SuperCheckbox from "../../SuperCheckbox/superCheckbox";

type EditModalType = {
    title: string
    callback: (id: string) => void
    id: string
    name: string
}

export const EditModal = (props: EditModalType) => {

    const editHandler = () => {
        props.callback(props.id)
    }
    return (
        <BasicModal type={'edit'}>
            <div>
                <h2>{props.title}</h2>
                <input type="text"/>
                <SuperCheckbox>Private</SuperCheckbox>
                <button onClick={editHandler}>Save</button>
            </div>
        </BasicModal>
    );
};