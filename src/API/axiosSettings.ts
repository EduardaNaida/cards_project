import axios from 'axios'

export const instance = axios.create({
  baseURL:
    process.env.NODE_ENV !== 'development'
      ? process.env.REACT_APP_RECOVERY_PASSWORD_URL
      : 'http://localhost:7542/2.0/',
  withCredentials: true,
})
