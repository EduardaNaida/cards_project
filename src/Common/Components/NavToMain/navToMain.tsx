import React from 'react'
import { Link } from 'react-router-dom'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import s from './navToMain.module.css'

export const NavToMain = () => {
  return (
    <div className={s.navToMain}>
      <Link to={'/packs-list'}>
        <KeyboardBackspaceIcon />
        Back to Packs List
      </Link>
    </div>
  )
}
