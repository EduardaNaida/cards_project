import React, { FC } from 'react'
import { formatingDate } from '../../../utils/formatDate'
import { IconButton, TableRow } from '@mui/material'
import { StyledTableCell } from '../../../Common/Components/StyledTableComponents/styledTableCell'
import SchoolIcon from '@mui/icons-material/School'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { CardPacksUpdateType } from '../../../API/CardsApi/cardsApi'
import { deletePackTC, updatePackTC } from './packsListReducer'
import { useAppDispatch, UseAppSelector } from '../../../App/store'
import { useNavigate } from 'react-router-dom'

export type PacksListTableRowPropsType = {
  packData: CardPacksUpdateType
}

export const PacksListTableRow: FC<PacksListTableRowPropsType> = ({ packData }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const handleDeletePack = (pack_id: string) => {
    dispatch(deletePackTC(pack_id))
  }
  const handleUpdateTask = (pack_id: string) => {
    dispatch(updatePackTC({ _id: pack_id, name: '!UPDATED!' }))
  }
  const handleNavigateToPack = () => {
    if (packData.user_id === myUserId) {
      navigate('/my-pack/' + packData.user_id)
    } else {
      navigate('/friends-pack/' + packData.user_id)
    }
  }

  const myUserId = UseAppSelector((state) => state.user._id)
  const formattedDate = formatingDate(packData.updated)
  const isMyPack = packData.user_id === myUserId
  return (
    <TableRow key={packData._id}>
      <StyledTableCell component="th" scope="row">
        {packData.name}
      </StyledTableCell>
      <StyledTableCell align="right">{packData.cardsCount}</StyledTableCell>
      <StyledTableCell align="right">{formattedDate}</StyledTableCell>
      <StyledTableCell align="right">{packData.user_name}</StyledTableCell>
      <StyledTableCell align="right">
        <IconButton onClick={handleNavigateToPack}>
          <SchoolIcon />
        </IconButton>
        {isMyPack && (
          <>
            <IconButton
              onClick={() => {
                handleUpdateTask(packData._id)
              }}
            >
              <BorderColorIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                handleDeletePack(packData._id)
              }}
            >
              <DeleteForeverIcon />
            </IconButton>
          </>
        )}
      </StyledTableCell>
    </TableRow>
  )
}
