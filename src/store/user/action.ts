import { action } from '../utils'
import firebase from 'firebase'

export const SIGN_IN = 'SIGN_IN'
export const SIGN_OUT = 'SIGN_OUT'

export const signIn = (user: firebase.User) => action(SIGN_IN, user)
export const signOut = () => action(SIGN_OUT, null)

export type UserActionTypes = ReturnType<typeof signIn>
                            | ReturnType<typeof signOut>
