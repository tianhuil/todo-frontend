import { TodoFirestore } from "../../firestore";
import { addTodo, modifyTodo, removeTodo } from "./actions";
import { Todo, PartialTodo, Id } from "./types";
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
            dispatch(removeTodo((change.doc.data() as Todo).id))
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

  async remove(dispatch: Dispatch, id: Id) {
    dispatch(removeTodo(id))
    await this.todoFirestore.remove(id)
  }
}

// this action is just a helper function
export const newTodo = (text: string) => addTodo({id: cuid(), text, completed: false})

