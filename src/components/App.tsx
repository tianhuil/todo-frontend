import React from 'react';
import './App.css';
import { Layout } from './Layout'
import { TodoList } from './TodoList'
import { AddTodo } from './AddTodo';
import { store } from '../store';
import { Provider } from 'react-redux';

const App = () => {
  return (
    <Provider store={store}>
      <Layout>
        <AddTodo />
        <TodoList/>
      </Layout>
    </Provider>
  )
}

export default App;
