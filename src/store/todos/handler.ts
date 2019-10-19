import { TodoFirestore } from "../../firestore";
import { createTodo, updateTodo, deleteTodo } from "./action";
import { Todo, PartialTodo, Id, Uid } from "../../type";
import { Dispatch } from "redux";
import cuid from 'cuid'
import { firestore } from "firebase";

export class TodoHandler {
  owner: Uid
  todoFirestore: TodoFirestore

  constructor(uid: Uid, db: firestore.Firestore) {
    this.owner = uid
    this.todoFirestore = new TodoFirestore(uid, db)
  }

  subscribe(dispatch: Dispatch) {
    this.todoFirestore.subscribeChanges(
      (change, synced) => {
        switch(change.type) {
          case 'added': {
            dispatch(createTodo({
              data: change.doc.data() as Todo,
              synced
            }))
            break
          }
          case 'modified': {
            dispatch(updateTodo({
              data: change.doc.data() as PartialTodo,
              synced
            }))
            break
          }
          case 'removed': {
            dispatch(deleteTodo({
              data: (change.doc.data() as Todo).id,
              synced
            }))
            break
          }
        }
      }
    )
  }

  // these dispatch 'pre-emptive' actions before sending to database
  // the confirmation will come through the subscription
  async create(dispatch: Dispatch, todo: Todo) {
    dispatch(createTodo({ synced: false, data: todo }))
    await this.todoFirestore.create(todo)
  }

  async update(dispatch: Dispatch, partialTodo: PartialTodo) {
    dispatch(updateTodo({ synced: false, data: partialTodo}))
    await this.todoFirestore.update(partialTodo)
  }

  async delete(dispatch: Dispatch, id: Id) {
    dispatch(deleteTodo({synced: false, data: id}))
    await this.todoFirestore.delete(id)
  }

  // helper function
  async add(dispatch: Dispatch, text: string) {
    await this.create(dispatch, {id: cuid(), text, completed: false, owner: this.owner})
  }
}
