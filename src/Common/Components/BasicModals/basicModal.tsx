import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {FC, ReactElement} from "react";
import {IconButton} from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import BorderColorIcon from "@mui/icons-material/BorderColor";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const BasicModal: FC<BasicModalType> = ({children, type}) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            {type === 'delete' ? (
                    <IconButton onClick={handleOpen}>
                        <DeleteForeverIcon/>
                    </IconButton>
                )
                : (
                    <IconButton onClick={handleOpen}>
                        <BorderColorIcon/>
                    </IconButton>
                )}

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {children}
                </Box>
            </Modal>
        </>
    );
}

type BasicModalType = {
    children: ReactElement
    type: string
}
