import React from 'react'
import style from './title.module.css'

type TitleType = {
  title: string
}

export const Title = (props: TitleType) => {
  return <div className={style.title}>{props.title}</div>
}
