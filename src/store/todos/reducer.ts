import { ADD_TODO, MODIFY_TODO, DELETE_TODO, TodoActionTypes } from './action'
import { Todo } from './type'

// slighty odd Todo, but it allows O(1) mutations
export type TodoState = {
  allIds: string[],  // all ids
  getById: { // get Todo for a specific id
    [id: string]: Todo,  // should be Id but that's not allowed
  },
}

export const todoInitialState: TodoState = {
  allIds: [],
  getById: {},
}

export function todoReducer(
  state = todoInitialState,
  action: TodoActionTypes,
): TodoState {
  const { allIds, getById: getId } = state
  switch (action.type) {
    case ADD_TODO: {
      const newTodo: Todo = action.payload
      return {
        allIds: allIds.includes(newTodo.id) ? allIds : [...allIds, newTodo.id],
        getById: {
          ...getId,
          [newTodo.id]: newTodo,
        }
      }
    }

    case MODIFY_TODO: {
      const id = action.payload.id
      const modifiedTodo: Todo = {
        ...getId[id],
        ...action.payload,
      }
      return {
        ...state,
        getById: {
          ...getId,
          [id]: modifiedTodo,
        },
      }
    }

    case DELETE_TODO: {
      const id = action.payload.id
      const newGetId = {...getId}
      delete newGetId[id]
      return {
        ...state,
        allIds: allIds.filter((i) => i !== id),
        getById: newGetId,
      }
    }

    default: {
      return state
    }
  }
}
