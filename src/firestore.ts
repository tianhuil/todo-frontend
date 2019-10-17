import { PartialTodo, Todo, Id, Uid } from "./type";
import * as firebase from "firebase/app"
// Required for side-effects -- sad
// See https://firebase.google.com/docs/firestore/quickstart
require("firebase/firestore");


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
  db: firebase.firestore.Firestore
  uid: Uid
  todoCollection: firebase.firestore.CollectionReference

  constructor(uid: Uid) {
    this.db = firebase.firestore()
    this.uid = uid
    this.todoCollection = this.db.collection('todo')
  }

  subscribeChanges(
    callback: (change: firebase.firestore.DocumentChange) => void
  ): () => void {
    return this.db.collection("todo")
      .where('owner', '==', this.uid)
      .onSnapshot(snap => {
        snap.docChanges().forEach(callback)
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
