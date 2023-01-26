import { AnyAction, applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { appReducer, AppReducerActionsType } from './appReducer'
import { authReducer, AuthReducersActionType } from '../Features/authReducer'
import { cardReducer, CardReducerActionType } from '../Features/Main/MyPack/cardReducer'
import { PacksListActionsType, packsListReducer } from '../Features/Main/PacksList/packsListReducer'
import { UserActionsType, userReducer } from '../Features/userReducer'
import {
  FriendsPackActionsType,
  friendsPackReducer,
} from '../Features/Main/FriendsPack/friendsPackReducer'
import { LearnActionsType, learnReducer } from '../Features/Learn/learnReducer'

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  user: userReducer,
  cards: cardReducer,
  packsList: packsListReducer,
  friendsCards: friendsPackReducer,
  learn: learnReducer,
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>

export const UseAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
export const AppDispatch = () => useDispatch<AppDispatchType>()

export const useAppDispatch: () => ThunkDispatch<AppRootStateType, any, AnyAction> = useDispatch
export type AppActionsType =
  | UserActionsType
  | AppReducerActionsType
  | AuthReducersActionType
  | CardReducerActionType
  | PacksListActionsType
  | FriendsPackActionsType
  | LearnActionsType

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateType,
  unknown,
  AppActionsType
>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store
