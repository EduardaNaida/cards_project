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
type SetNewPageType = ReturnType<typeof setCardsPageAC>
type SetPageCountType = ReturnType<typeof setCardsPageCountAC>
type SetCardsTotalCountType = ReturnType<typeof setCardsTotalCountAC>
type SetSearchCardType = ReturnType<typeof setSearchCardAC>

export type CardReducerActionType =
  | GetCardActionType
  | SetNewQuestionType
  | SetNewPageType
  | SetPageCountType
  | SetCardsTotalCountType
  | SetSearchCardType

const initialState: InitialStateType = {
  cards: [],
  cardsTotalCount: 0,
  maxGrade: 5,
  minGrade: 0,
  page: 1,
  pageCount: 5,
  packUserId: '',
  cardQuestion: '',
}

type SearchType = {
  cardQuestion: string
}

export type InitialStateType = ResponseCardsType & SearchType

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
    case 'CARDS/SET-PAGE': {
      return {
        ...state,
        page: action.page,
      }
    }
    case 'CARDS/SET-PAGE-COUNT': {
      return {
        ...state,
        pageCount: action.pageCount,
      }
    }
    case 'CARDS/SET-TOTAL-COUNT': {
      return {
        ...state,
        cardsTotalCount: action.cardsTotalCount,
      }
    }
    case 'CARDS/SET-SEARCH-QUESTION': {
      return {
        ...state,
        cardQuestion: action.searchQuestion,
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

export const setCardsPageAC = (page: number) => ({ type: 'CARDS/SET-PAGE', page } as const)
export const setCardsPageCountAC = (pageCount: number) =>
  ({ type: 'CARDS/SET-PAGE-COUNT', pageCount } as const)
export const setCardsTotalCountAC = (cardsTotalCount: number) =>
  ({
    type: 'CARDS/SET-TOTAL-COUNT',
    cardsTotalCount,
  } as const)

export const setSearchCardAC = (searchQuestion: string) =>
  ({ type: 'CARDS/SET-SEARCH-QUESTION', searchQuestion } as const)

export const getCardsTC =
  (cardsPack_id: string): AppThunk =>
  (dispatch, getState) => {
    const { page, pageCount, cardQuestion } = getState().cards

    cardsAPI
      .getCards({ cardsPack_id, page, pageCount, cardQuestion })
      .then((res) => {
        dispatch(getCardsAC(res.data.cards))
        dispatch(setCardsTotalCountAC(res.data.cardsTotalCount))
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
        dispatch(getCardsTC(res.data.deletedCard.cardsPack_id))
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
