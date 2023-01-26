import { setAppStatusAC } from '../../App/appReducer'
import { handleError } from '../../utils/errorUtils'
import { learnAPI, SetGradeDataType } from '../../API/CardsApi/learnApi'
import { AppThunk } from '../../App/store'
import { CardsType } from '../../API/CardsApi/cardsApi'

const initialState = {
  currentCard: {} as CardsType,
  grades: ['Did not know', 'Forgot', 'A lot of thought', 'Confused', 'Knew the answer'],
  isFirst: true,
  isCheckedAnswer: false,
  grade: 1,
}

export const learnReducer = (
  state: InitialStateType = initialState,
  action: LearnActionsType,
): InitialStateType => {
  switch (action.type) {
    case 'LEARN/SET-CURRENT-CARD': {
      return { ...state, currentCard: action.data } //
    }
    case 'LEARN/SET-GRADE': {
      return { ...state, grade: action.grade }
    }
    case 'LEARN/SET-IS-CHECKED-ANSWER': {
      return { ...state, isCheckedAnswer: action.isCheckedAnswer }
    }
    default: {
      return state
    }
  }
}

// ACTION CREATORS
export const setCurrentCardAC = (data: CardsType) =>
  ({ type: 'LEARN/SET-CURRENT-CARD', data } as const)
export const setLearnGradeAC = (grade: number) => ({ type: 'LEARN/SET-GRADE', grade } as const)
export const setIsCheckedAnswerAC = (isCheckedAnswer: boolean) =>
  ({ type: 'LEARN/SET-IS-CHECKED-ANSWER', isCheckedAnswer } as const)

// THUNK CREATORS
export const updateGrade = (): AppThunk => {
  return (dispatch, getState) => {
    const state = getState()
    const card_id = state.learn.currentCard._id
    const grade = state.learn.grade
    const model: SetGradeDataType = { card_id, grade }

    dispatch(setAppStatusAC('loading'))

    learnAPI
      .setGrade(model)
      .then((res) => {
        dispatch(setLearnGradeAC(res.data.updatedGrade.grade))
        dispatch(setAppStatusAC('succeeded'))
        dispatch(setIsCheckedAnswerAC(false))
      })
      .catch((e) => {
        handleError(e, dispatch)
      })
      .finally(() => {
        dispatch(setAppStatusAC('idle'))
      })
  }
}

// TYPE
type InitialStateType = typeof initialState
export type LearnActionsType =
  | ReturnType<typeof setCurrentCardAC>
  | ReturnType<typeof setLearnGradeAC>
  | ReturnType<typeof setIsCheckedAnswerAC>
