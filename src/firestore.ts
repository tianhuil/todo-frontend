import { Todo } from "./store/todos/type"
import { PartialTodo, Id } from "./store";
import * as firebase from "firebase/app"
// Required for side-effects -- sad
// See https://firebase.google.com/docs/firestore/quickstart
require("firebase/firestore");


export class TodoFirestore {
  db: firebase.firestore.Firestore
  todoCollection: firebase.firestore.CollectionReference

  constructor() {
    if (!firebase.apps.length) {
      const firebaseConfig = {
        projectId: process.env['REACT_APP_FIREBASE_ID'],
        apiKey: process.env['REACT_APP_FIREBASE_API_KEY']
      }

      firebase.initializeApp(firebaseConfig);
    }
    this.db = firebase.firestore()
    this.todoCollection = this.db.collection('todo')
  }

  subscribeChanges(
    callback: (change: firebase.firestore.DocumentChange) => void
  ): () => void {
    return this.db.collection("todo").onSnapshot(snap => {
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
