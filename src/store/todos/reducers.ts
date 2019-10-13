import { ADD_TODO, DELETE_TODO, TodoActionTypes, TOGGLE_TODO } from './actions'
import { Todo } from './types'

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
        allIds: [...allIds, newTodo.id],
        getById: {
          ...getId,
          [newTodo.id]: newTodo,
        }
      }
    }

    case TOGGLE_TODO: {
      const id = action.payload.id
      const toggledTodo: Todo = {
        ...getId[id],
        completed: !getId[id].completed,
      }
      return {
        ...state,
        getById: {
          ...getId,
          [id]: toggledTodo,
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
