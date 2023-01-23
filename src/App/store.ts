import { AnyAction, applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { appReducer, AppReducerActionsType } from './appReducer'
import { authReducer, AuthReducersActionType } from '../features/authReducer'
import { cardReducer, CardReducerActionType } from '../features/Main/MyPack/cardReducer'
import { PacksListActionsType, packsListReducer } from '../features/Main/PacksList/packsListReducer'
import {UserActionsType, userReducer} from '../features/userReducer';
import {FriendsPackActionsType, friendsPackReducer} from '../features/Main/FriendsPack/friendsPackReducer';

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  user: userReducer,
  cards: cardReducer,
  packsList: packsListReducer,
  friendsCards: friendsPackReducer,
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

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateType,
  unknown,
  AppActionsType
>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store
