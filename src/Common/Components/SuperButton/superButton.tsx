import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'
import s from './superButton.module.css'

// тип пропсов обычной кнопки, children в котором храниться название кнопки там уже описан
type DefaultButtonPropsType = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

type SuperButtonPropsType = DefaultButtonPropsType & {
  xType?: string
  red?: boolean
  default?: boolean
  secondary?: boolean
}

const SuperButton: React.FC<SuperButtonPropsType> = ({
  xType,
  className,
  disabled,
  red,
  secondary,
  ...restProps // все остальные пропсы попадут в объект restProps, там же будет children
}) => {
  const finalClassName =
    s.button +
    (xType === 'red' ? ' ' + s.red : ' ' + s.default) +
    (xType === 'secondary' ? ' ' + s.secondary : ' ' + s.default) +
    (disabled ? ' ' + s.disabled : ' ' + s.default) +
    (className ? ' ' + className : '') // задачка на смешивание классов
  return (
    <button
      disabled={disabled}
      className={finalClassName}
      {...restProps} // отдаём кнопке остальные пропсы если они есть (children там внутри)
    />
  )
}

export default SuperButton