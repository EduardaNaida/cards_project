import React, { ChangeEvent } from 'react'

export const uploadImg = (e: ChangeEvent<HTMLInputElement>, callBack: (value: string) => void) => {
  if (e.target.files && e.target.files.length) {
    const file = e.target.files[0]
    console.log('file: ', file)
    if (file.size < 4000000) {
      convertFileToBase64(file, (file64: string) => {
        console.log('file64: ', file64)
        callBack(file64)
      })
    } else {
      console.error('Error: ', 'Файл слишком большого размера')
    }
  }
}

export const convertFileToBase64 = (file: File, callBack: (value: string) => void) => {
  const reader = new FileReader()
  reader.onloadend = () => {
    const file64 = reader.result as string
    callBack(file64)
  }
  reader.readAsDataURL(file)
}
