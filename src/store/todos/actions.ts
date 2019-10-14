import { action } from '../utils'
import { Id, Todo, PartialTodo } from './types'

export const ADD_TODO = 'ADD_TODO'
export const MODIFY_TODO = 'MODIFY_TODO'
export const DELETE_TODO = 'DELETE_TODO'

export const addTodo = (todo: Todo) => action(ADD_TODO, todo)

export const modifyTodo = (todoPartial: PartialTodo) => action(MODIFY_TODO, todoPartial)

export const deleteTodo = (id: Id) => action(DELETE_TODO, { id })

export type TodoActionTypes = ReturnType<typeof addTodo>
                            | ReturnType<typeof modifyTodo>
                            | ReturnType<typeof deleteTodo>

