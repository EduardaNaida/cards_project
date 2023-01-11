import React, { useEffect } from 'react'
import './App.css'
import Main from '../common/components/Main/main'
import { AppRootStateType, useAppDispatch } from './store'
import { useSelector } from 'react-redux'
import { initializedAppTC } from './appReducer'
import { CircularProgress } from '@mui/material'
import { UserType } from '../API/API'

function App() {
  const isInitialized = useSelector<AppRootStateType, boolean>((state) => state.app.initialized)
  const isLoggedIn = useSelector<AppRootStateType, UserType>((state) => state.user)
  console.log(isLoggedIn)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(initializedAppTC())
  }, [isLoggedIn.email])

  if (!isInitialized) {
    return (
      <div className="CircularProgress">
        <CircularProgress />
      </div>
    )
  }

  return (
    <div className="App">
      <Main />
    </div>
  )
}

export default App
