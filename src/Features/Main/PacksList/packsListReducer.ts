import {
  CardPacksUpdateType,
  packAPI,
  ParamsTypePacks,
  ResponseCardsPacksType,
} from '../../../API/CardsApi/cardsApi'
import { AppThunk } from '../../../App/store'
import { setAppErrorAC, setAppStatusAC } from '../../../App/appReducer'
import { AxiosError } from 'axios'

type PacksListType = {
  cardPacks: CardPacksUpdateType[] | []
  cardPacksTotalCount: number
  maxCardsCount: number
  minCardsCount: number
  page: number
  pageCount: number
  searchParams: {
    max: number
    min: number
  }
  search: string
  packsChoose: 'all' | 'my'
}

const initialState: PacksListType = {
  cardPacks: [],
  cardPacksTotalCount: 0,
  maxCardsCount: 0,
  minCardsCount: 0,
  page: 1,
  pageCount: 5,
  searchParams: {
    max: 0,
    min: 0,
  },
  search: '',
  packsChoose: 'all',
}
export type PacksListActionsType =
  | ReturnType<typeof setPacksAC>
  | ReturnType<typeof setPageAC>
  | ReturnType<typeof setPageCountAC>
  | ReturnType<typeof setPacksChooseAC>
  | ReturnType<typeof setSearchAC>
  | ReturnType<typeof setCurrentCardsCountAC>
  | ReturnType<typeof setSearchParamsCardsCountAC>

export const packsListReducer = (
  state: PacksListType = initialState,
  action: PacksListActionsType,
): PacksListType => {
  switch (action.type) {
    case 'PACKS-LIST/SET-PACKS-DATA': {
      const copyState = { ...state, ...action.packsData }
      copyState.cardPacks = action.packsData.cardPacks
      return copyState
    }
    case 'PACKS-LIST/SET-PAGE': {
      return { ...state, page: action.page }
    }
    case 'PACKS-LIST/SET-PAGE-COUNT': {
      return { ...state, pageCount: action.pageCount }
    }
    case 'PACKS-LIST/SET-PACKS-CHOOSE': {
      return { ...state, packsChoose: action.packsChoose }
    }
    case 'PACKS-LIST/SET-SEARCH': {
      return { ...state, search: action.searchValue }
    }
    case 'PACKS-LIST/SET-SEARCH-PARAMS-CURRENT-CARDS-COUNT': {
      return {
        ...state,
        searchParams: {
          ...state.searchParams,
          max: action.cardsCount.max,
          min: action.cardsCount.min,
        },
      }
    }
    case 'PACKS-LIST/SET-CURRENT-CARDS-COUNT': {
      return {
        ...state,
        maxCardsCount: action.cardsCount.max,
        minCardsCount: action.cardsCount.min,
      }
    }
    default: {
      return state
    }
  }
}

// ACTION CREATORS
export const setPacksAC = (packsData: ResponseCardsPacksType) =>
  ({
    type: 'PACKS-LIST/SET-PACKS-DATA',
    packsData,
  } as const)

export const setPageAC = (page: number) =>
  ({
    type: 'PACKS-LIST/SET-PAGE',
    page,
  } as const)

export const setPageCountAC = (pageCount: number) =>
  ({
    type: 'PACKS-LIST/SET-PAGE-COUNT',
    pageCount,
  } as const)

export const setPacksChooseAC = (packsChoose: 'all' | 'my') =>
  ({
    type: 'PACKS-LIST/SET-PACKS-CHOOSE',
    packsChoose,
  } as const)

export const setSearchAC = (searchValue: string) =>
  ({
    type: 'PACKS-LIST/SET-SEARCH',
    searchValue,
  } as const)

export const setSearchParamsCardsCountAC = (cardsCount: { max: number; min: number }) =>
  ({
    type: 'PACKS-LIST/SET-SEARCH-PARAMS-CURRENT-CARDS-COUNT',
    cardsCount,
  } as const)

export const setCurrentCardsCountAC = (cardsCount: { max: number; min: number }) =>
  ({
    type: 'PACKS-LIST/SET-CURRENT-CARDS-COUNT',
    cardsCount,
  } as const)

// THUNK CREATORS
export const getPacksDataTC = (): AppThunk => {
  return (dispatch, getState) => {
    const user_id = getState().user._id

    const { page, pageCount, packsChoose, search } = getState().packsList
    const { max, min } = getState().packsList.searchParams

    const ParamsObj: ParamsTypePacks = {
      page,
      pageCount,
      packName: search,
      max,
      min,
    }

    if (user_id !== null && packsChoose === 'my') {
      ParamsObj['user_id'] = user_id
      ParamsObj['min'] = 0
    }
    dispatch(setAppStatusAC('loading'))
    packAPI
      .getPack(ParamsObj)
      .then((res) => {
        dispatch(setPacksAC(res.data))
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
}

export const addNewPackTC = (newPackName: string): AppThunk => {
  return (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    packAPI
      .postPack({ name: newPackName })
      .then(() => {
        dispatch(getPacksDataTC())
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
}

export const deletePackTC = (id: string): AppThunk => {
  return (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    packAPI
      .deletePack(id)
      .then(() => {
        dispatch(getPacksDataTC())
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
}

export const updatePackTC = (cardsPack: CardPacksUpdateType): AppThunk => {
  return (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    packAPI
      .updatePack(cardsPack)
      .then(() => {
        dispatch(getPacksDataTC())
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
}
