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
            dispatch(addTodo(change.doc.data() as Todo))
            break
          }
          case 'modified': {
            dispatch(modifyTodo(change.doc.data() as PartialTodo))
            break
          }
          case 'removed': {
            dispatch(deleteTodo((change.doc.data() as Todo).id))
            break
          }
        }
      }
    )
  }

  async create(dispatch: Dispatch, todo: Todo) {
    dispatch(addTodo(todo))
    await this.todoFirestore.create(todo)
  }

  async new(dispatch: Dispatch, text: string) {
    await this.create(dispatch, {id: cuid(), text, completed: false})
  }

  async modify(dispatch: Dispatch, partialTodo: PartialTodo) {
    dispatch(modifyTodo(partialTodo))
    await this.todoFirestore.modify(partialTodo)
  }

  async delete(dispatch: Dispatch, id: Id) {
    dispatch(deleteTodo(id))
    await this.todoFirestore.delete(id)
  }
}

// this action is just a helper function
export const newTodo = (text: string) => addTodo({id: cuid(), text, completed: false})

