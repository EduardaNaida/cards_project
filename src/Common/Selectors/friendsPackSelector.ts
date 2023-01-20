import { AppRootStateType } from '../../App/store'

export const selectFriendsCards = (state: AppRootStateType) => state.friendsCards.cards
export const selectFriendsCardsPage = (state: AppRootStateType) => state.friendsCards.page
export const selectFriendsCardsPageCount = (state: AppRootStateType) => state.friendsCards.pageCount
export const selectFriendsCardsTotalCount = (state: AppRootStateType) =>
  state.friendsCards.cardsTotalCount
