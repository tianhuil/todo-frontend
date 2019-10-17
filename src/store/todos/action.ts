import { action } from '../utils'
import { Id, Synced, Todo, PartialTodo } from '../../type'

export const ADD_TODO = 'ADD_TODO'
export const MODIFY_TODO = 'MODIFY_TODO'
export const DELETE_TODO = 'DELETE_TODO'

export const addTodo = (todo: Synced<Todo>) => action(ADD_TODO, todo)

export const modifyTodo = (todoPartial: Synced<PartialTodo>) => action(MODIFY_TODO, todoPartial)

export const deleteTodo = (id: Synced<Id>) => action(DELETE_TODO, id)

export type TodoActionTypes = ReturnType<typeof addTodo>
                            | ReturnType<typeof modifyTodo>
                            | ReturnType<typeof deleteTodo>

