import React, { useReducer, memo } from 'react';
import './App.css';
import { todoInitialState, todoReducer } from '../store/todos/reducers';
import { ListItem, List } from '@material-ui/core';
import { Layout } from './Layout'

const App = memo(props => {
  const [state, dispatch] = useReducer(todoReducer, todoInitialState)
  return (<Layout>
    <List>
      {state.allIds.map(id => <ListItem>{state.getById[id].text}</ListItem>)}
    </List>
  </Layout>)
})

export default App;
