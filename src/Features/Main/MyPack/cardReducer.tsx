import {AppThunk} from '../../../App/store'
import {
  cardsAPI,
  CardsType,
  CardType,
  ResponseCardsType,
  UpdateCardType,
} from '../../../API/CardsApi/cardsApi'
import {AxiosError} from 'axios'
import {setAppErrorAC, setAppStatusAC} from '../../../App/appReducer'

type GetCardActionType = ReturnType<typeof getCardsAC>
type SetNewQuestionType = ReturnType<typeof setNewQuestion>
type SetNewPageType = ReturnType<typeof setCardsPageAC>
type SetPageCountType = ReturnType<typeof setCardsPageCountAC>
type SetCardsTotalCountType = ReturnType<typeof setCardsTotalCountAC>
type SetSearchCardType = ReturnType<typeof setSearchCardAC>
type SetNewAnswerType = ReturnType<typeof setNewAnswer>

export type CardReducerActionType =
  | GetCardActionType
  | SetNewQuestionType
  | SetNewPageType
  | SetPageCountType
  | SetCardsTotalCountType
  | SetSearchCardType
  | SetNewAnswerType

const initialState: InitialStateType = {
  cards: [],
  cardsTotalCount: 0,
  maxGrade: 5,
  minGrade: 0,
  page: 1,
  pageCount: 5,
  packUserId: '',
  cardQuestion: '',
  cardAnswer: '',
}

type SearchType = {
  cardQuestion: string
  cardAnswer: string
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
          card._id === action._id ? {...card, question: action.question} : card,
        ),
      }
    }
    case 'CARDS/SET-NEW-ANSWER': {
      return {
        ...state,
        cards: state.cards.map((card) =>
          card._id === action._id ? {...card, answer: action.cardAnswer} : card,
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
  ({type: 'CARDS/GET-CARDS', payload: {cards}} as const)

const setNewQuestion = (cards: CardsType, _id: string, question: string) =>
  ({
    type: 'CARDS/SET-NEW-QUESTION',
    _id,
    question,
    cards,
  } as const)

const setNewAnswer = (cards: CardsType, _id: string, cardAnswer: string) =>
  ({
    type: 'CARDS/SET-NEW-ANSWER',
    _id,
    cardAnswer,
    cards,
  } as const)

export const setCardsPageAC = (page: number) => ({type: 'CARDS/SET-PAGE', page} as const)
export const setCardsPageCountAC = (pageCount: number) =>
  ({type: 'CARDS/SET-PAGE-COUNT', pageCount} as const)
export const setCardsTotalCountAC = (cardsTotalCount: number) =>
  ({
    type: 'CARDS/SET-TOTAL-COUNT',
    cardsTotalCount,
  } as const)

export const setSearchCardAC = (searchQuestion: string) =>
  ({type: 'CARDS/SET-SEARCH-QUESTION', searchQuestion} as const)

export const getCardsTC =
  (cardsPack_id: string): AppThunk =>
    (dispatch, getState) => {
      const {page, pageCount, cardQuestion} = getState().cards
      dispatch(setAppStatusAC('loading'))

      cardsAPI
        .getCards({cardsPack_id, page, pageCount, cardQuestion})
        .then((res) => {
          dispatch(getCardsAC(res.data.cards))
          dispatch(setCardsTotalCountAC(res.data.cardsTotalCount))
          dispatch(setAppStatusAC('succeeded'))
        })
        .catch((e: AxiosError<{ error: string }>) => {
          dispatch(setAppStatusAC('failed'))
          const error = e.response
            ? e.response.data.error
            : e.message + ', more details in the console'
          dispatch(setAppErrorAC(error))
        })
    }

export const addCardsTC =
  (card: CardType): AppThunk =>
    (dispatch) => {
      dispatch(setAppStatusAC('loading'))
      cardsAPI
        .postCards(card)
        .then((res) => {
          dispatch(getCardsTC(res.data.newCard.cardsPack_id))
          dispatch(setAppStatusAC('succeeded'))
        })
        .catch((e: AxiosError<{ error: string }>) => {
          dispatch(setAppStatusAC('failed'))
          const error = e.response
            ? e.response.data.error
            : e.message + ', more details in the console'
          dispatch(setAppErrorAC(error))
        })
    }

export const removeCardsTC =
  (id: string): AppThunk =>
    (dispatch) => {
      dispatch(setAppStatusAC('loading'))
      cardsAPI
        .deleteCards(id)
        .then((res) => {
          dispatch(getCardsTC(res.data.deletedCard.cardsPack_id))
          dispatch(setAppStatusAC('succeeded'))
        })
        .catch((e: AxiosError<{ error: string }>) => {
          dispatch(setAppStatusAC('failed'))
          const error = e.response
            ? e.response.data.error
            : e.message + ', more details in the console'
          dispatch(setAppErrorAC(error))
        })
    }

export const updateCardsTC =
  (card: UpdateCardType): AppThunk =>
    (dispatch) => {
      dispatch(setAppStatusAC('loading'))
      cardsAPI
        .updateCards(card)
        .then((res) => {
          dispatch(
            setNewQuestion(
              res.data.updatedCard,
              res.data.updatedCard._id,
              res.data.updatedCard.question,
            ),
          )
          dispatch(
            setNewAnswer(res.data.updatedCard, res.data.updatedCard._id, res.data.updatedCard.answer),
          )
          dispatch(setAppStatusAC('succeeded'))
        })
        .catch((e: AxiosError<{ error: string }>) => {
          dispatch(setAppStatusAC('failed'))
          const error = e.response
            ? e.response.data.error
            : e.message + ', more details in the console'
          dispatch(setAppErrorAC(error))
        })
    }
