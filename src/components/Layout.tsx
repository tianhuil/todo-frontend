import React, { memo } from 'react';

import { Paper } from '@material-ui/core';
import { Header } from './Header';
import { AddTodo } from './AddTodo';
import { TodoList } from './TodoList';

export const Layout = memo(() => {
  return (
    <Paper
      elevation={0}
      style={{ padding: 0, margin: 0, backgroundColor: '#fafafa'}}
    >
      <Header/>
      <AddTodo/>
      <TodoList/>
    </Paper>
  );
});
