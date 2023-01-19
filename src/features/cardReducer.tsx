import {AppThunk} from "../app/store";
import {
    cardsAPI,
    CardsType,
    CardType,
    ResponseCardsType, UpdateCardType,
} from "../API/cardsApi/cardsApi";

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

export const cardReducer = (state: InitialStateType = initialState, action: CardReducerActionType): any => {
    switch (action.type) {
        case 'CARDS/GET-CARDS': {
            return {
                ...state,
                cards: [...action.cards]
            }
        }
        case "CARDS/SET-NEW-QUESTION": {
            return {
                ...state,
                cards: state.cards.map(card => card._id === action._id ?
                    {...card, question: action.question}
                    : card)
            }
        }
    }
    return state
}

const getCardsAC = (cards: CardsType[]) => ({type: 'CARDS/GET-CARDS', cards} as const)
const setNewQuestion = (cards: CardsType, _id: string, question: string) => ({
    type: 'CARDS/SET-NEW-QUESTION',
    _id,
    question,
    cards
} as const)


export const getCardsTC = (cardsPack_id: string): AppThunk => (dispatch) => {
    cardsAPI.getCards({cardsPack_id})
        .then((res) => {
            dispatch(getCardsAC(res.data.cards))
        })
        .catch((e) => {
            console.log(e)
        })
}

export const addCardsTC = (card: CardType): AppThunk => (dispatch) => {
    cardsAPI.postCards(card)
        .then((res) => {
            dispatch(getCardsTC(res.data.newCard.cardsPack_id))
        })
        .catch((e) => {
            console.log(e)
        })
}

export const removeCardsTC = (id: string): AppThunk => (dispatch) => {
    cardsAPI.deleteCards(id)
        .then((res) => {
            dispatch(getCardsTC(res.data.deleteCard.cardsPack_id))
        })
        .catch((e) => {
            console.log(e)
        })
}

export const updateCardsTC = (card: UpdateCardType): AppThunk => (dispatch) => {
    cardsAPI.updateCards(card)
        .then((res) => {
            // dispatch(getCardsTC(res.data.updatedCard.cardsPack_id))
            console.log(res)
            dispatch(setNewQuestion(res.data.updatedCard, res.data.updatedCard._id, res.data.updatedCard.question))
        })
        .catch((e) => {
            console.log(e)
        })
}