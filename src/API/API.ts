import axios from 'axios'

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true,
})

export const userDataAPI = {
    registerUser(userData: createUserDataType) {
        return instance.post<ResponseRegisterAndUpdateUser>('auth/register', userData)
    },
    loginUser(userData: createUserDataType) {
        return instance.post<ResponseLoginDataType>('auth/login', userData)
    },
    logoutUser() {
        return instance.delete<ResponseForgetPassAndLogout>('auth/me', {})
    },
    me() {
        return instance.post<ResponseLoginDataType>('auth/me', {})
    },
    updateUserProfile(userData: updateUserProfileType) {
        return instance.put<ResponseRegisterAndUpdateUser>('auth/me', userData)
    },
    sendRecoveryPasswordLink(passwordRecoveryData: PasswordRecoveryDataType) {
        return instance.post<ResponseForgetPassAndLogout>('auth/forgot', passwordRecoveryData)
    },
    setNewPasswordUser(newPasswordData: newPasswordDataType) {
        return instance.post<ResponseForgetPassAndLogout>('auth/set-new-password', newPasswordData)
    },
}

export const cardsPackAPI = {
    getCardsPack(params: ParamsTypePacks) {
        return instance.get<ResponseCardsPacksType>('cards/pack', {
            params: params
        })
    },
    postCardsPack(cardsPack: CardsPackType) {
        return instance.post<ResponseCardsPacksType>('cards/pack', cardsPack)
    },
    deleteCardsPack(id: string) {
        return instance.delete<ResponseCardsPacksType>(`cards/pack?id=${id}`)
    },
    updateCardsPack(cardsPack: CardPacksType) {
        return instance.put<ResponseCardsPacksType>('cards/pack', cardsPack)
    }
}

export const cardsCardAPI = {
    getCardsCard(params: ParamsTypeCards) {
        return instance.get<ResponseCardsType>('cards/card', {
            params: params
        })
    },
    postCardsCard(card: CardType) {
        return instance.post<ResponseCardsType>('cards/card', card)
    },
    deleteCardsCard(id: string){
        return instance.delete<ResponseCardsType>(`cards/card?${id}`)
    },
    updateCardsCard(_id: string, question: string){
        return instance.put<ResponseCardsType>('cards/card', {_id, question})
    }
}

// TYPES

export type CardType = {
    cardsPack_id: string
    question: string
    answer: string
    grade?: number
    shots?: number
    answerImg?: string
    questionImg?: string
    questionVideo?: string
    answerVideo?: string
}
export type ParamsTypeCards = {
    cardAnswer?: string,
    cardQuestion?: string,
    cardsPack_id?: string,
    min?: number,
    max?: number,
    sortCards?: string,
    page?: number,
    pageCount?: number
}

export type CardsType = {
    answer: number
    question: string
    cardsPack_id: string
    grade: number
    shots: number
    user_id: string
    created: string
    updated: string
    _id: string
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
    name: string
    deckCover?: string
    private: boolean
}

export type CardPacksType = {
    _id: string
    user_id?: string
    name: string
    cardsCount?: number
    created?: string
    updated?: string
}
export type ResponseCardsPacksType = {
    cardPacks: Array<CardPacksType>
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
}

export type createUserDataType = {
    email: string
    password: string
    rememberMe?: boolean
}

export type UserType = {
    _id: string | null
    email: string | null
    name: string | null
    avatar?: string | null
    publicCardPacksCount: number | null // количество колод
    created: Date | null
    updated: Date | null
    isAdmin: boolean | null
    verified: boolean | null // подтвердил ли почту
    rememberMe: boolean | null
}

export type ResponseDataType = {
    error?: string
}

export type ResponseLoginDataType = UserType & ResponseDataType
export type ResponseForgetPassAndLogout = {
    info: string
} & ResponseDataType
export type ResponseRegisterAndUpdateUser = {
    updatedUser: UserType
} & ResponseDataType

export type updateUserProfileType = {
    name?: string | null
    avatar?: string | null
}

export type PasswordRecoveryDataType = {
    email: string // почта получателя для восстановления пароля
    from?: string //test-front-admin <ai73a@yandex.by>, заголовок для письма и почта отправителя
    message: string //сообщение, которое придёт на почту получателя
}

export type newPasswordDataType = {
    password: string
    resetPasswordToken: string // Токен из ссылки
}
