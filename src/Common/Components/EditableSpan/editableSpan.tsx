import React, { ChangeEvent, useState } from 'react'
import editIcon from '../../../Assets/Img/editIcon.svg'
import SuperButton from '../SuperButton/superButton'
import s from './editableSpan.module.css'

type EditableSpanPropsType = {
  name: string | null
  changeName: (newName: string | null) => void
}

const EditableSpan: React.FC<EditableSpanPropsType> = ({ name, changeName }) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false)
  const [newName, setNewName] = useState(name)

  const onEditMode = () => {
    setIsEditMode(true)
  }
  const offEditMode = () => {
    setIsEditMode(false)
    changeName(newName)
  }
  const onChangeEditHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewName(e.currentTarget.value)
  }

  const onClickEditHandler = () => {
    offEditMode()
  }

  return (
    <div className={s.editableSpan}>
      {isEditMode ? (
        <>
          <input
            value={newName !== null ? newName : 'name'}
            autoFocus
            onChange={onChangeEditHandler}
          />
          <SuperButton onClick={onClickEditHandler} className={s.saveButton}>
            save
          </SuperButton>
        </>
      ) : (
        <>
          <span onDoubleClick={onEditMode}>{name}</span>
          <img className={s.editIcon} onClick={onEditMode} src={editIcon} alt={'editIcon'} />
        </>
      )}
    </div>
  )
}

export default EditableSpan
