import { action } from '../utils'
import { Id, Synced, Todo, PartialTodo } from '../../type'

export const CREATE_TODO = 'CREATE_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'
export const DELETE_TODO = 'DELETE_TODO'

export const createTodo = (todo: Synced<Todo>) => action(CREATE_TODO, todo)

export const updateTodo = (todoPartial: Synced<PartialTodo>) => action(UPDATE_TODO, todoPartial)

export const deleteTodo = (id: Synced<Id>) => action(DELETE_TODO, id)

export type TodoActionTypes = ReturnType<typeof createTodo>
                            | ReturnType<typeof updateTodo>
                            | ReturnType<typeof deleteTodo>

