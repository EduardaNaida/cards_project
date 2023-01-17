import React, { useEffect } from 'react'
import './app.css'
import Main from '../Common/Components/Main/main'
import { useAppDispatch, UseAppSelector } from './store'
import { initializedAppTC } from './appReducer'
import { CircularProgress, LinearProgress } from '@mui/material'
import { ErrorSnackbar } from '../Common/Components/ErrorSnackbar/errorSnackbar'

export function App() {
  const isInitialized = UseAppSelector((state) => state.app.initialized)
  const isLoggedIn = UseAppSelector((state) => state.user.email)
  const appStatus = UseAppSelector((state) => state.app.status)

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(initializedAppTC())
  }, [dispatch, isLoggedIn])

  if (!isInitialized) {
    return (
      <div className="CircularProgress">
        <CircularProgress />
      </div>
    )
  }

  return (
    <div className="App">
      {appStatus === 'loading' && (
        <LinearProgress sx={{ position: 'absolute', zIndex: '100', width: '100%', left: '0' }} />
      )}
      <ErrorSnackbar />
      <Main />
    </div>
  )
}

export default App
