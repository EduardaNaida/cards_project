import React from 'react';
import {BasicModal} from "../basicModal";

type AddModalType = {
    title: string
    callback: () => void
}

export const AddModal = (props: AddModalType) => {
    return (
        <BasicModal title={props.title}>
            <div>
                <h2>{props.title}</h2>
                <input type="text"/>
                <button onClick={props.callback}>Save</button>
            </div>
        </BasicModal>
    );
};