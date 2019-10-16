import { ADD_TODO, MODIFY_TODO, DELETE_TODO, TodoActionTypes } from './action'
import { Todo, Synced, Id } from './type'

// slighty odd Todo, but it allows O(1) mutations
export type TodoState = {
  allIds: string[],  // all ids
  getById: { // get Todo for a specific id
    [id: string]: Synced<Todo>,  // should be Id but that's not allowed
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
      const newTodo: Synced<Todo> = action.payload
      const id: Id = newTodo.data.id
      return {
        allIds: allIds.includes(id) ? allIds : [...allIds, id],
        getById: {
          ...getId,
          [id]: newTodo,
        }
      }
    }

    case MODIFY_TODO: {
      const id: Id = action.payload.data.id
      const modifiedTodo: Synced<Todo> = {
        ...action.payload,
        data: {
          ...getId[id].data,
          ...action.payload.data
        }
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
      const id: Id = action.payload.data
      const newGetId = {...getId}

      if(!action.payload.synced) {
        // if not synced, just mark as unsynced
        return {
          ...state,
          getById: newGetId,
        }
      } else {
        // delete for real
        delete newGetId[id]
        return {
          ...state,
          allIds: allIds.filter((i) => i !== id),
          getById: newGetId,
        }
      }
    }

    default: {
      return state
    }
  }
}
