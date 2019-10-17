import { UserActionTypes, SIGN_IN, SIGN_OUT } from "./action"

export type UserState = firebase.User | null

const userInitialState: UserState = null

export function userReducer(
  state: UserState = userInitialState,
  action: UserActionTypes,
): UserState {
  switch (action.type) {
    case SIGN_IN: return action.payload
    case SIGN_OUT: return null
    default: return state
  }
}
