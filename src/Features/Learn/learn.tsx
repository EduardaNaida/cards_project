import React, { useEffect, useState } from 'react'
import SuperButton from '../../Common/Components/SuperButton/superButton'
import { Title } from '../../Common/Components/Title/title'
import s from './learn.module.css'
import sMain from './../Main/main.module.css'
import { NavToMain } from '../../Common/Components/NavToMain/navToMain'
import { useAppDispatch, UseAppSelector } from '../../App/store'
import { selectFriendsCards } from '../../Common/Selectors/friendsPackSelector'
import { useParams } from 'react-router-dom'
import { setFriendsCardsTC } from '../Main/FriendsPack/friendsPackReducer'
import { getRandomQuestion } from '../../utils/getRandomQuestion'
import {
  setCurrentCardAC,
  setIsCheckedAnswerAC,
  setLearnGradeAC,
  updateGrade,
} from './learnReducer'
import { Answer } from './Answer/answer'

export const Learn = () => {
  const dispatch = useAppDispatch()

  const cards = UseAppSelector(selectFriendsCards)
  const card = UseAppSelector((s) => s.learn.currentCard)
  const grades = UseAppSelector((s) => s.learn.grades)
  const isCheckedAnswer = UseAppSelector((s) => s.learn.isCheckedAnswer)

  const [first, setFirst] = useState(true)

  const { packId } = useParams()
  const cardsPack_id = packId ? packId : ''

  useEffect(() => {
    dispatch(setFriendsCardsTC({ cardsPack_id }))
  }, [cardsPack_id])

  useEffect(() => {
    if (first) {
      setFirst(false)
    }
    if (cards.length > 0) {
      dispatch(setCurrentCardAC(getRandomQuestion(cards)))
    }
    return () => {}
  }, [dispatch, cards, first])

  const showAnswer = () => {
    dispatch(setIsCheckedAnswerAC(true))
  }

  const onNextQuestion = () => {
    dispatch(setIsCheckedAnswerAC(true))
    dispatch(updateGrade())
    if (cards.length > 0) {
      dispatch(setCurrentCardAC(getRandomQuestion(cards)))
    }
  }

  const onChangeGrade = (grade: number) => {
    dispatch(setLearnGradeAC(grade))
  }

  return (
    <div className={sMain.wrapper}>
      <NavToMain />
      <div className={s.wrapperLearn}>
        <Title title={'Learn'} />
        <span>
          <b>Question: {card.question}</b>
        </span>
        <span>
          Number of attempts at answering the question: <b>{card.shots}</b>
        </span>
        {isCheckedAnswer && <Answer card={card} grades={grades} onChangeGrade={onChangeGrade} />}
        {isCheckedAnswer ? (
          <SuperButton onClick={onNextQuestion}>Next question</SuperButton>
        ) : (
          <SuperButton onClick={showAnswer}>Show answer</SuperButton>
        )}
      </div>
    </div>
  )
}
