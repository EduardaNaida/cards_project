import React, {useEffect, useState} from 'react'
import {addCardsTC, getCardsTC, removeCardsTC, updateCardsTC} from "./cardReducer";
import {AppDispatch, UseAppSelector} from "../../../App/store";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {StyledTableCell} from "../../../Common/Components/StyledTableComponents/styledTableCell";
import {CardsType} from "../../../API/CardsApi/cardsApi";
import {formatingDate} from "../../../utils/formatDate";
import {IconButton, Rating} from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {useParams} from "react-router-dom";
import SuperButton from "../../../Common/Components/SuperButton/superButton";
import style from "./myPack.module.css";
import {TableSearchBar} from "../../../Common/Components/TableSearchbar/tableSearchbar";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

export const MyPack = () => {
    const dispatch = AppDispatch()
    const {packId} = useParams();
    console.log(packId)

    const [rows, setRows] = useState<CardsType[] | []>([])
    const [value, setValue] = useState<number | null>()

    const cards = UseAppSelector(state => state.cards.cards)

    useEffect(() => {
        if (packId) {
            dispatch(getCardsTC(packId))
            setRows(cards)
        }
    }, [dispatch])


    const addCard = () => {
        if (packId) {
            dispatch(addCardsTC({
                cardsPack_id: packId,
                question: 'Whats your name?',
                answer: 'Anna'
            }))
        }
    }

    const removeCard = (id: string) => {
        dispatch(removeCardsTC(id))
    }
    const updateCard = (id: string) => {
        dispatch(updateCardsTC({_id: id, question: 'hwwwwwww'}))
    }
    return <div className={style.container}>
        <IconButton sx={{display: 'flex', justifyContent: 'flex-start', color: 'black'}}>
            <KeyboardBackspaceIcon/>
            <p className={style.text}>Back to Packs List</p>
        </IconButton>
        <div className={style.main}>
            <h2>My Pack</h2>
            <SuperButton className={style.button} onClick={addCard}>Add new card</SuperButton>
        </div>
        {cards.length === 0
            ? <div>My pack is empty</div>
            :
            <div className={style.tableContainer}>
                <TableSearchBar onChange={() => {
                }}/>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 700}} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Question</StyledTableCell>
                                <StyledTableCell align="right">Answer</StyledTableCell>
                                <StyledTableCell align="right">Last Updated</StyledTableCell>
                                <StyledTableCell align="center">Grade</StyledTableCell>
                                <StyledTableCell align="right"></StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => {
                                    const formattedDate = formatingDate(row.updated)
                                    return (
                                        <TableRow key={row._id}>
                                            <StyledTableCell component="th" scope="row">{row.question}</StyledTableCell>
                                            <StyledTableCell align="right">{row.answer}</StyledTableCell>
                                            <StyledTableCell align="right">{formattedDate}</StyledTableCell>
                                            <StyledTableCell align="right">
                                                <Rating
                                                    name="simple-controlled"
                                                    value={row.grade}
                                                    onChange={(event, newValue) => {
                                                        setValue(newValue);
                                                    }}
                                                />
                                            </StyledTableCell>
                                            <StyledTableCell align="right">
                                                <IconButton onClick={() => {
                                                    updateCard(row._id)
                                                }}>
                                                    <BorderColorIcon/>
                                                </IconButton>
                                                <IconButton onClick={() => {
                                                    removeCard(row._id)
                                                }}>
                                                    <DeleteForeverIcon/>
                                                </IconButton>
                                            </StyledTableCell>
                                        </TableRow>
                                    )
                                }
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        }
    </div>
}
