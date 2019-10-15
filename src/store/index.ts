import { todoReducer, } from './todos/reducer'
import { TodoHandler, } from './todos/handler'
import { Id, Todo, PartialTodo } from './todos/type'
import { combineReducers, createStore, applyMiddleware } from 'redux'
import { useSelector } from 'react-redux'
import { routerMiddleware } from 'connected-react-router'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import { Status } from './utils'
import { routerReducer, history, statusSelector, querySelector , filterPush } from './filter'

const reducer = combineReducers({
  todo: todoReducer,
  router: routerReducer,
})

export const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(
      thunkMiddleware,
      routerMiddleware(history)
    )
  )
)

export type State = ReturnType<typeof reducer>

export function useReduxSelector<TSelected>(
  selector: (state: State) => TSelected,
  equalityFn?: (left: TSelected, right: TSelected) => boolean
): TSelected {
  return useSelector<State, TSelected>(selector, equalityFn)
}

export function stateStatusSelector(state: State): Status {
  return statusSelector(state.router)
}

export function stateQuerySelector(state: State): string {
  return querySelector(state.router)
}

export { Status, history, filterPush, TodoHandler }

export type Id = Id
export type Todo = Todo
export type PartialTodo = PartialTodo
