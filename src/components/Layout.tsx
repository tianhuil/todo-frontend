import React, { memo } from 'react';

import { Paper, makeStyles, Theme } from '@material-ui/core';
import { Header } from './Header';
import { AddTodo } from './AddTodo';
import { TodoList } from './TodoList';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    padding: 0,
    margin: 0,
    backgroundColor: '#fafafa'
  }
}))

export const Layout = memo(() => {
  const classes = useStyles()

  return (
    <Paper
      elevation={0}
      className={classes.paper}
    >
      <Header/>
      <AddTodo/>
      <TodoList/>
    </Paper>
  );
});
