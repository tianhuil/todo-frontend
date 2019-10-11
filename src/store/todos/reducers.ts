import { ADD_TODO, DELETE_TODO, Todo, TodoActionTypes, TOGGLE_TODO } from './actions'

// slighty odd Todo, but it allows O(1) mutations
export type TodoState = {
  allIds: number[],  // all ids
  getById: { // get Todo for a specific id
    [id: number]: Todo,
  },
  nextId: number, // next Id to use
}

export const todoInitialState: TodoState = {
  allIds: [0, 1],
  getById: {
    0: { id: 0, text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', completed: false },
    1: { id: 1, text: 'Praesentium placeat aut animi suscipit ipsa nesciunt vitae vero', completed: true },
  },
  nextId: 2,
}

export function todoReducer(
  state = todoInitialState,
  action: TodoActionTypes,
): TodoState {
  const { allIds, getById: getId, nextId } = state
  switch (action.type) {
    case ADD_TODO: {
      const newTodo: Todo = {
        id: nextId,
        text: action.payload.text,
        completed: false,
      }
      return {
        allIds: [...allIds, nextId],
        getById: {
          ...getId,
          [nextId]: newTodo,
        },
        nextId: nextId + 1,
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
