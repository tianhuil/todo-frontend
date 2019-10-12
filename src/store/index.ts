import { addTodo, deleteTodo, toggleTodo } from './todos/actions'
import { todoReducer, } from './todos/reducers'
import { combineReducers, createStore, applyMiddleware,  } from 'redux'
import { useSelector } from 'react-redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createBrowserHistory } from 'history'
import { Status } from './utils'

export const history = createBrowserHistory()

const reducer = combineReducers({
  todo: todoReducer,
  router: connectRouter(history),
})

export const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(
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
  const pathname = state.router.location.pathname as Status
  return Object.values(Status).includes(pathname) ? (pathname) : Status.All
}

export { addTodo, deleteTodo, toggleTodo, Status }
