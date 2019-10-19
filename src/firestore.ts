import { PartialTodo, Todo, Id, Uid } from "./type";
import firebase, {firestore} from "firebase/app"
// Next import required for side-effects (sigh)
// See https://firebase.google.com/docs/firestore/quickstart
import 'firebase/firestore'


export function initializeFirestoreOnce() {
  if (!firebase.apps.length) {
    return firebase.initializeApp({
      projectId: process.env['REACT_APP_FIREBASE_ID'],
      apiKey: process.env['REACT_APP_FIREBASE_API_KEY']
    })
  } else {
    return firebase.apps[0]
  }
}

export class TodoFirestore {
  db: firestore.Firestore
  uid: Uid | null
  todoCollection: firestore.CollectionReference

  constructor(uid: Uid | null, db: firestore.Firestore) {
    this.db = db
    this.uid = uid
    this.todoCollection = this.db.collection('todo')
  }

  protected todos(): firestore.Query {
    if (this.uid) {
      return this.todoCollection.where('owner', '==', this.uid)
    } else {
      return this.todoCollection
    }
  }

  async query(): Promise<firestore.QuerySnapshot> {
    return this.todos().get()
  }

  subscribeChanges(
    callback: (
      change: firestore.DocumentChange,
      synced: boolean) => void
  ): () => void {
    const listenOptions = { includeMetadataChanges: true }

    return this.todos().onSnapshot(listenOptions, snap => {
      const { fromCache, hasPendingWrites} = snap.metadata
      const synced = !(fromCache || hasPendingWrites)

      snap.docChanges(listenOptions)
        .forEach(
          change => callback(change, synced)
        )
    })
  }

  async create(todo: Todo): Promise<void> {
    await this.todoCollection.doc(todo.id).set(todo)
  }

  async update(partialTodo: PartialTodo): Promise<void> {
    await this.todoCollection.doc(partialTodo.id).update(partialTodo)
  }

  async delete(id: Id): Promise<void> {
    await this.todoCollection.doc(id).delete()
  }
}
