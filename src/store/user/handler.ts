import firebase from 'firebase'
import { signIn, signOut, UserActionTypes } from "./action";

export function userAuthStateChange(user: firebase.User | null): UserActionTypes {
  if (user) {
    console.log('logged in')
    return signIn(user)
  } else {
    console.log('unlogged in')
    return signOut()
  }
}
