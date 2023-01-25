import React, {FC} from 'react'
import {formatingDate} from '../../../utils/formatDate'
import {IconButton, TableRow, Tooltip} from '@mui/material'
import {StyledTableCell} from '../../../Common/Components/StyledTableComponents/styledTableCell'
import SchoolIcon from '@mui/icons-material/School'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import {CardPacksUpdateType} from '../../../API/CardsApi/cardsApi'
import {deletePackTC, updatePackTC} from './packsListReducer'
import {useAppDispatch, UseAppSelector} from '../../../App/store'
import {useNavigate} from 'react-router-dom'
import {DeleteModal} from "../../../Common/Components/BasicModals/DeleteModal/deleteModal";
import {EditModal} from "../../../Common/Components/BasicModals/EditModal/editModal";

export type PacksListTableRowPropsType = {
    packData: CardPacksUpdateType
}

export const PacksListTableRow: FC<PacksListTableRowPropsType> = ({packData}) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const handleDeletePack = (pack_id: string) => {
        dispatch(deletePackTC(pack_id))
    }
    const handleUpdateTask = (pack_id: string) => {
        dispatch(updatePackTC({_id: pack_id, name: '!UPDATED!'}))
    }
    const handleNavigateToPack = () => {
        if (packData.user_id === myUserId) {
            navigate('/my-pack/' + packData._id)
        } else {
            navigate('/friends-pack/' + packData._id)
        }
    }
    const hanldeNavigateToLearn = () => {
        alert('Learn in developing')
    }

    const myUserId = UseAppSelector((state) => state.user._id)
    const formattedDate = formatingDate(packData.updated)
    const isMyPack = packData.user_id === myUserId

    const tooltipName = packData.user_id === myUserId ? 'go to my pack' : 'go to friend pack'
    const tooltipLearn = packData.user_id === myUserId ? 'go learn my pack' : 'go learn friend pack'

    return (
        <TableRow key={packData._id}>
            <StyledTableCell component="th" scope="row" onClick={handleNavigateToPack}>
                <Tooltip title={tooltipName}>
                    <b>{packData.name}</b>
                </Tooltip>
            </StyledTableCell>
            <StyledTableCell align="right">{packData.cardsCount}</StyledTableCell>
            <StyledTableCell align="right">{formattedDate}</StyledTableCell>
            <StyledTableCell align="right">{packData.user_name}</StyledTableCell>
            <StyledTableCell align="right">
                <Tooltip title={tooltipLearn}>
                    <IconButton onClick={hanldeNavigateToLearn}>
                        <SchoolIcon/>
                    </IconButton>
                </Tooltip>
                {isMyPack && (
                    <>
                    <Tooltip title="update pack name">
                        <EditModal name={packData.name}
                                   title={'Edit pack'}
                                   callback={handleUpdateTask}
                                   id={packData._id}/>
                    </Tooltip>
                    <Tooltip title="delete my pack">
                        <DeleteModal name={packData.name}
                                     title={'Delete pack'}
                                     callback={handleDeletePack}
                                     id={packData._id}/>
                    </Tooltip>
                    </>
                    )}
            </StyledTableCell>
        </TableRow>
    )
}
