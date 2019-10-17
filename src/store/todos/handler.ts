import { TodoFirestore } from "../../firestore";
import { addTodo, modifyTodo, deleteTodo } from "./action";
import { Todo, PartialTodo, Id, Uid } from "../../type";
import { Dispatch } from "redux";
import cuid from 'cuid'

export class TodoHandler {
  uid: Uid
  todoFirestore: TodoFirestore

  constructor(uid: Uid) {
    this.uid = uid
    this.todoFirestore = new TodoFirestore(uid)
  }

  subscribe(dispatch: Dispatch) {
    this.todoFirestore.subscribeChanges(
      (change, synced) => {
        switch(change.type) {
          case 'added': {
            dispatch(addTodo({
              data: change.doc.data() as Todo,
              synced
            }))
            break
          }
          case 'modified': {
            dispatch(modifyTodo({
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
    dispatch(addTodo({ synced: false, data: todo }))
    await this.todoFirestore.create(todo)
  }

  async modify(dispatch: Dispatch, partialTodo: PartialTodo) {
    dispatch(modifyTodo({ synced: false, data: partialTodo}))
    await this.todoFirestore.modify(partialTodo)
  }

  async delete(dispatch: Dispatch, id: Id) {
    dispatch(deleteTodo({synced: false, data: id}))
    await this.todoFirestore.delete(id)
  }

  // helper function
  async new(dispatch: Dispatch, text: string) {
    await this.create(dispatch, {id: cuid(), text, completed: false, owner: this.uid})
  }
}
