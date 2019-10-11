import { addTodo, deleteTodo, toggleTodo } from './todos/actions'
import { todoReducer, TodoState, todoInitialState } from './todos/reducers'
import { combineReducers, AnyAction, Dispatch, createStore,  } from 'redux'
import React, { useContext, createContext } from 'react'
import { ReactReduxContext } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({
  todo: todoReducer,
})

const store = createStore(
  reducer,
  composeWithDevTools()
)

const Context = createContext(store)

export const ReduxProvider: React.FunctionComponent = ({ children }) => {
  const { Provider } = Context

  return (
    <Provider value={store}>
      {children}
    </Provider>
  )
}

export type State = ReturnType<typeof reducer>

function useReduxReducer() {
  return useContext(Context)
}

export { addTodo, deleteTodo, toggleTodo, useReduxReducer, store }
