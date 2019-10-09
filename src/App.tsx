import React, { useReducer, memo } from 'react';
import './App.css';
import { todoInitialState, todoReducer } from './store/todos/reducers';
import { AppBar, Toolbar, Typography, Paper, ListItem, List } from '@material-ui/core';

const Layout = memo(props => {
  return (
    <Paper
      elevation={0}
      style={{ padding: 0, margin: 0, backgroundColor: '#fafafa'}}
    >
      <AppBar color='primary' position='static' style={{ height: 64 }}>
        <Toolbar style={{height: 64}}>
          <Typography color='inherit'>TODO APP</Typography>
        </Toolbar>
      </AppBar>
      {props.children}
    </Paper>
  );
});

const App = memo(props => {
  const [state, dispatch] = useReducer(todoReducer, todoInitialState)
  return (<Layout>
    <List>
      {state.allIds.map(id => <ListItem>{state.getById[id].text}</ListItem>)}
    </List>
  </Layout>)
})



export default App;
