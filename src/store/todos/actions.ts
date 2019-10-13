import { action } from '../utils'
import { Id } from './types'
import cuid from 'cuid'

export const ADD_TODO = 'ADD_TODO'
export const TOGGLE_TODO = 'TOGGLE_TODO'
export const DELETE_TODO = 'DELETE_TODO'

export const addTodo = (text: string) => action(ADD_TODO, { text, id: cuid(), completed: false })

export const toggleTodo = (id: Id) => action(TOGGLE_TODO, { id })

export const deleteTodo = (id: Id) => action(DELETE_TODO, { id })

export type TodoActionTypes = ReturnType<typeof addTodo>
                            | ReturnType<typeof toggleTodo>
                            | ReturnType<typeof deleteTodo>
