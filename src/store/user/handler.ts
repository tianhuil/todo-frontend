import firebase from 'firebase'
import { signIn, signOut, UserActionTypes } from "./action";

export function userAuthStateChange(user: firebase.User | null): UserActionTypes {
  if (user) {
    return signIn(user)
  } else {
    return signOut()
  }
}
