import React, { useReducer, memo } from 'react';
import './App.css';
import { todoInitialState, todoReducer } from '../store/todos/reducers';
import { ListItem, List } from '@material-ui/core';
import { Layout } from './Layout'
import { TodoList } from './TodoList'

const App = memo(props => {
  const [state, dispatch] = useReducer(todoReducer, todoInitialState)
  return (<Layout>
    <TodoList
      todos={state.allIds.map(id => state.getById[id])}
      onItemCheck={() => {}}
      onItemRemove={() => {}}
    />
    {/* <List>
      {state.allIds.map(id => <ListItem>{state.getById[id].text}</ListItem>)}
    </List> */}
  </Layout>)
})

export default App;
