import { AppThunk } from '../../../App/store'
import {
  cardsAPI,
  CardsType,
  CardType,
  ResponseCardsType,
  UpdateCardType,
} from '../../../API/CardsApi/cardsApi'
import { AxiosError } from 'axios'

type GetCardActionType = ReturnType<typeof getCardsAC>
type SetNewQuestionType = ReturnType<typeof setNewQuestion>

export type CardReducerActionType = GetCardActionType | SetNewQuestionType

const initialState: InitialStateType = {
  cards: [],
  cardsTotalCount: 0,
  maxGrade: 5,
  minGrade: 0,
  page: 1,
  pageCount: 2,
  packUserId: '',
}

export type InitialStateType = ResponseCardsType

export const cardReducer = (
  state: InitialStateType = initialState,
  action: CardReducerActionType,
): InitialStateType => {
  switch (action.type) {
    case 'CARDS/GET-CARDS': {
      return {
        ...state,
        cards: [...action.payload.cards],
      }
    }
    case 'CARDS/SET-NEW-QUESTION': {
      return {
        ...state,
        cards: state.cards.map((card) =>
          card._id === action._id ? { ...card, question: action.question } : card,
        ),
      }
    }
  }
  return state
}

const getCardsAC = (cards: CardsType[]) =>
  ({ type: 'CARDS/GET-CARDS', payload: { cards } } as const)
const setNewQuestion = (cards: CardsType, _id: string, question: string) =>
  ({
    type: 'CARDS/SET-NEW-QUESTION',
    _id,
    question,
    cards,
  } as const)

export const getCardsTC =
  (cardsPack_id: string): AppThunk =>
  (dispatch) => {
    cardsAPI
      .getCards({ cardsPack_id })
      .then((res) => {
        dispatch(getCardsAC(res.data.cards))
      })
      .catch((e: AxiosError<{ error: string }>) => {
        const error = e.response
          ? e.response.data.error
          : e.message + ', more details in the console'
        console.log(error)
      })
  }

export const addCardsTC =
  (card: CardType): AppThunk =>
  (dispatch) => {
    cardsAPI
      .postCards(card)
      .then((res) => {
        dispatch(getCardsTC(res.data.newCard.cardsPack_id))
      })
      .catch((e: AxiosError<{ error: string }>) => {
        const error = e.response
          ? e.response.data.error
          : e.message + ', more details in the console'
        console.log(error)
      })
  }

export const removeCardsTC =
  (id: string): AppThunk =>
  (dispatch) => {
    cardsAPI
      .deleteCards(id)
      .then((res) => {
        dispatch(getCardsTC(res.data.deleteCard.cardsPack_id))
      })
      .catch((e: AxiosError<{ error: string }>) => {
        const error = e.response
          ? e.response.data.error
          : e.message + ', more details in the console'
        console.log(error)
      })
  }

export const updateCardsTC =
  (card: UpdateCardType): AppThunk =>
  (dispatch) => {
    cardsAPI
      .updateCards(card)
      .then((res) => {
        console.log(res)
        dispatch(
          setNewQuestion(
            res.data.updatedCard,
            res.data.updatedCard._id,
            res.data.updatedCard.question,
          ),
        )
      })
      .catch((e: AxiosError<{ error: string }>) => {
        const error = e.response
          ? e.response.data.error
          : e.message + ', more details in the console'
        console.log(error)
      })
  }
