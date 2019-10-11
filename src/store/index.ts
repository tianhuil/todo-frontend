import { addTodo, deleteTodo, toggleTodo } from './todos/actions'
import { todoReducer, } from './todos/reducers'
import { combineReducers, createStore,  } from 'redux'
import { useSelector } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({
  todo: todoReducer,
})

export const store = createStore(
  reducer,
  composeWithDevTools()
)

export type State = ReturnType<typeof reducer>

export function useReduxSelector<TSelected>(
  selector: (state: State) => TSelected,
  equalityFn?: (left: TSelected, right: TSelected) => boolean
): TSelected {
  return useSelector<State, TSelected>(selector, equalityFn)
}

export { addTodo, deleteTodo, toggleTodo }
