import React, { useReducer, memo } from 'react';
import './App.css';
import { todoInitialState, todoReducer } from '../store/todos/reducers';
import { Layout } from './Layout'
import { TodoList } from './TodoList'
import { AddTodo } from './AddTodo';
import { useInputValue } from '../store/input';
import { toggleTodo, deleteTodo } from '../store';

const App = memo(props => {
  const [state, dispatch] = useReducer(todoReducer, todoInitialState)

  const {
    inputValue,
    changeInput,
    clearInput,
    keyInput,
  } = useInputValue('')
  return (<Layout>
    <AddTodo
      inputValue={inputValue}
      onInputChange={changeInput}
      onInputKeyPress={keyInput}
      onButtonClick={clearInput}
    />
    <TodoList
      todos={state.allIds.map(id => state.getById[id])}
      onItemCheck={(id) => dispatch(toggleTodo(id))}
      onItemRemove={(id) => dispatch(deleteTodo(id))}
    />
  </Layout>)
})

export default App;
