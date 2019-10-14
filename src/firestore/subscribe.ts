import { Dispatch } from "redux"

import { initializeFirestore } from "."
import { addTodo } from "../store"
import { Todo } from "../store/todos/types"

export function subscribeToFirestore(dispatch: Dispatch) {
  const db = initializeFirestore()

  db.collection("todo").onSnapshot(snap => {
    snap.docChanges().forEach(change => {
      switch(change.type) {
        case 'added': {
          dispatch(addTodo(change.doc.data() as Todo))
          break
        }
        case 'removed': {
          console.error('Not Handled')
          break
        }
        case 'modified': {
          console.error('Not Handled')
          break
        }
      }
    })
  })
}
