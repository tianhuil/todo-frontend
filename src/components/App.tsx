import React, { useReducer, memo } from 'react';
import './App.css';
import { todoInitialState, todoReducer } from '../store/todos/reducers';
import { Layout } from './Layout'
import { TodoList } from './TodoList'
import { AddTodo } from './AddTodo';
import { toggleTodo, deleteTodo, addTodo, store, useReduxReducer, ReduxProvider } from '../store';

const App = () => {
  const {getState, dispatch} = useReduxReducer()
  const todo = getState().todo

  return (
    <ReduxProvider>
      <Layout>
        <AddTodo
          addTodo={(text) => dispatch(addTodo(text)) }
        />
        <TodoList
          todos={todo.allIds.map(id => todo.getById[id])}
          onItemCheck={(id) => dispatch(toggleTodo(id))}
          onItemRemove={(id) => dispatch(deleteTodo(id))}
        />
      </Layout>
    </ReduxProvider>
  )
}

export default App;
