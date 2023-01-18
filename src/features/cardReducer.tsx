import {AppThunk} from "../app/store";
import {
    cardsAPI,
    CardsType,
    CardType,
    ResponseCardsType, UpdateCardType,
} from "../API/cardsApi/cardsApi";

type GetCardActionType = ReturnType<typeof getCardsAC>

export type CardReducerActionType = GetCardActionType

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
    }
    return state
}

const getCardsAC = (cards: CardsType[]) => ({type: 'CARDS/GET-CARDS', cards} as const)


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

export const updateCardsTC = (cards: UpdateCardType): AppThunk => (dispatch) => {
    cardsAPI.updateCards(cards)
        .then((res) => {
            dispatch(getCardsTC(res.data.updatedCard.cardsPack_id))
        })
        .catch((e) => {
            console.log(e)
        })
}