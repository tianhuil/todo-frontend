import { TodoFirestore } from "../../firestore";
import { addTodo, modifyTodo, deleteTodo } from "./action";
import { Todo, PartialTodo, Id } from "./type";
import { Dispatch } from "redux";
import cuid from 'cuid'

export class TodoHandler {
  todoFirestore: TodoFirestore = new TodoFirestore()

  subscribe(dispatch: Dispatch) {
    this.todoFirestore.subscribeChanges(
      change => {
        switch(change.type) {
          case 'added': {
            dispatch(addTodo({
              data: change.doc.data() as Todo,
              synced: true
            }))
            break
          }
          case 'modified': {
            dispatch(modifyTodo({
              data: change.doc.data() as PartialTodo,
              synced: true
            }))
            break
          }
          case 'removed': {
            dispatch(deleteTodo({
              data: (change.doc.data() as Todo).id,
              synced: true
            }))
            break
          }
        }
      }
    )
  }

  async create(dispatch: Dispatch, todo: Todo) {
    dispatch(addTodo({ synced: false, data: todo }))
    await this.todoFirestore.create(todo)
    dispatch(addTodo({ synced: true, data: todo }))
  }

  async new(dispatch: Dispatch, text: string) {
    await this.create(dispatch, {id: cuid(), text, completed: false})
  }

  async modify(dispatch: Dispatch, partialTodo: PartialTodo) {
    dispatch(modifyTodo({ synced: false, data: partialTodo}))
    await this.todoFirestore.modify(partialTodo)
    dispatch(modifyTodo({ synced: true, data: partialTodo}))
  }

  async delete(dispatch: Dispatch, id: Id) {
    dispatch(deleteTodo({synced: false, data: id}))
    await this.todoFirestore.delete(id)
    dispatch(deleteTodo({synced: true, data: id}))
  }
}
