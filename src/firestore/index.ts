import { Todo } from "../store/todos/types"
import * as firebase from "firebase/app"
// Required for side-effects -- sad
// See https://firebase.google.com/docs/firestore/quickstart
require("firebase/firestore");


export class TodoFirestore {
  db: firebase.firestore.Firestore | null = null
  todoCollection: firebase.firestore.CollectionReference | null = null

  initialize() {
    if (!firebase.apps.length) {
      const firebaseConfig = {
        projectId: process.env['REACT_APP_FIREBASE_ID']
      }

      firebase.initializeApp(firebaseConfig);
    }
    this.db = firebase.firestore()
    this.todoCollection = this.db.collection('todo')
  }

  subscribeChanges(callback: (change: firebase.firestore.DocumentChange) => void) {
    if (!this.db) throw new Error('Need to initialize db')

    this.db.collection("todo").onSnapshot(snap => {
      snap.docChanges().forEach(callback)
    })
  }

  async create(todo: Todo) {
    if (!this.todoCollection) throw new Error('Need to initialize db')

    return this.todoCollection.doc(todo.id).set(todo)
  }
}
