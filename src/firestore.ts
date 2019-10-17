import { PartialTodo, Todo, Id, Uid } from "./type";
import firebase, { firestore } from "firebase/app"
// Next import required for side-effects (sigh)
// See https://firebase.google.com/docs/firestore/quickstart
import 'firebase/firestore'


export function initializeFirestoreOnce() {
  if (!firebase.apps.length) {
    const firebaseConfig = {
      projectId: process.env['REACT_APP_FIREBASE_ID'],
      apiKey: process.env['REACT_APP_FIREBASE_API_KEY']
    }

    return firebase.initializeApp(firebaseConfig)
  } else {
    return firebase.apps[0]
  }
}

export class TodoFirestore {
  db: firestore.Firestore
  uid: Uid
  todoCollection: firestore.CollectionReference

  constructor(uid: Uid) {
    this.db = firestore()
    this.uid = uid
    this.todoCollection = this.db.collection('todo')
  }

  subscribeChanges(
    callback: (
      change: firestore.DocumentChange,
      synced: boolean) => void
  ): () => void {
    const listenOptions = { includeMetadataChanges: true }
    return this.db.collection("todo")
      .where('owner', '==', this.uid)
      .onSnapshot(listenOptions, snap => {
        const { fromCache, hasPendingWrites} = snap.metadata
        const synced = !(fromCache || hasPendingWrites)

        snap.docChanges(listenOptions)
          .forEach(
            change => callback(change, synced)
          )
      })
  }

  async create(todo: Todo) {
    await this.todoCollection.doc(todo.id).set(todo)
  }

  async modify(partialTodo: PartialTodo) {
    await this.todoCollection.doc(partialTodo.id).update(partialTodo)
  }

  async delete(id: Id) {
    await this.todoCollection.doc(id).delete()
  }
}
