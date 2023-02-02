import {instance} from '../axiosSettings'

export const packAPI = {
  getPack(params?: ParamsTypePacks) {
    return instance.get<ResponseCardsPacksType>('cards/pack', {
      params: params,
    })
  },
  postPack(cardsPack: CardsPackType) {
    return instance.post<ResponsePostPackType>('cards/pack', {cardsPack})
  },
  deletePack(id: string) {
    return instance.delete<ResponseDeletePackType>(`cards/pack?id=${id}`)
  },
  updatePack(cardsPack: CardPacksUpdateType) {
    return instance.put<ResponseUpdatedPackType>('cards/pack', {cardsPack})
  },
}

export const cardsAPI = {
  getCards(params: ParamsTypeCards) {
    return instance.get<ResponseCardsType>('cards/card', {
      params: params,
    })
  },
  postCards(card: CardType) {
    return instance.post<ResponsePostCardsType>('cards/card', {card})
  },
  deleteCards(id: string) {
    return instance.delete<ResponseDeleteCardsType>(`cards/card?id=${id}`)
  },
  updateCards(card: UpdateCardType) {
    return instance.put<ResponseUpdatedCardsType>('cards/card', {card})
  },
  gradeCards(grade: number | null, card_id: string) {
    return instance.put<ResponseUpdatedGradeCardsType>('cards/grade', {grade, card_id})
  },
}

// TYPES

//Cards
export type CardType = {
  cardsPack_id: string | null
  question?: string | null
  answer?: string | null
  grade?: number | null
  shots?: number | null
  answerImg?: string | null
  questionImg?: string | null
  questionVideo?: string | null
  answerVideo?: string | null
}

export type ParamsTypeCards = {
  cardAnswer?: string
  cardQuestion?: string
  cardsPack_id: string
  min?: number
  max?: number
  sortCards?: string
  page?: number
  pageCount?: number
}

export type CardsType = {
  answer: string
  question: string
  answerImg: string | null
  questionImg: string | null
  cardsPack_id: string
  grade: number
  shots: number
  user_id: string
  created: string
  updated: string
  _id: string
}

export type UpdateCardType = {
  _id: string
  question: string
  answer?: string
}
export type ResponseCardsType = {
  cards: Array<CardsType>
  cardsTotalCount: number
  maxGrade: number
  minGrade: number
  page: number
  pageCount: number
  packUserId: string
}

export type ResponsePostCardsType = {
  newCard: CardsType
}

export type ResponseDeleteCardsType = {
  deletedCard: CardsType
}

export type ResponseUpdatedCardsType = {
  updatedCard: CardsType
}

export type GradeType = {
  _id: string
  cardsPack_id: string
  card_id: string
  user_id: string
  grade: number
  shots: number
}
export type ResponseUpdatedGradeCardsType = {
  updatedGrade: GradeType
}
//Packs

export type ParamsTypePacks = {
  packName?: string
  min?: number
  max?: number
  sortPacks?: string
  page?: number
  pageCount?: number
  user_id?: string
}

export type CardsPackType = {
  name?: string
  deckCover?: string
  private?: boolean
}

export type CardPacksUpdateType = {
  _id: string
  user_id?: string
  user_name?: string
  name: string
  cardsCount?: number
  created?: string
  updated?: string
}

export type ResponseCardsPacksType = {
  cardPacks: Array<CardPacksUpdateType>
  cardPacksTotalCount: number
  maxCardsCount: number
  minCardsCount: number
  page: number
  pageCount: number
}

export type ResponsePostPackType = {
  newCardsPack: CardPacksUpdateType
}

export type ResponseDeletePackType = {
  deletedCardsPack: CardPacksUpdateType
}

export type ResponseUpdatedPackType = {
  updatedCardsPack: CardPacksUpdateType
}
