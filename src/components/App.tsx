import React, { useReducer, memo } from 'react';
import './App.css';
import { todoInitialState, todoReducer } from '../store/todos/reducers';
import { Layout } from './Layout'
import { TodoList } from './TodoList'
import { AddTodo } from './AddTodo';
import { toggleTodo, deleteTodo, addTodo } from '../store';

const App = memo(props => {
  const [state, dispatch] = useReducer(todoReducer, todoInitialState)

  return (<Layout>
    <AddTodo
      addTodo={(text) => dispatch(addTodo(text)) }
    />
    <TodoList
      todos={state.allIds.map(id => state.getById[id])}
      onItemCheck={(id) => dispatch(toggleTodo(id))}
      onItemRemove={(id) => dispatch(deleteTodo(id))}
    />
  </Layout>)
})

export default App;
