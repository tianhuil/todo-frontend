import React from 'react';

import { List, Paper, Theme } from '@material-ui/core'
import { useReduxSelector, Status, State, stateStatusSelector, stateQuerySelector } from '../store';
import { TodoItem } from './TodoItem'
import { makeStyles } from '@material-ui/styles';


const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    margin: theme.spacing(2)
  },
  list: {
    backgroundColor: theme.palette.background.paper,
  },
}))

function todoListSelector(state: State) {
  const status = stateStatusSelector(state)
  function statusFilter(completed: boolean) {
    switch(status) {
      case Status.All: return true
      case Status.Completed: return completed
      case Status.Incompleted: return !completed
    }
  }

  const query = stateQuerySelector(state)
  function queryFilter(text: string) {
    return text ? text.toLowerCase().includes(query.toLowerCase()) : true
  }
  return state.todo.allIds.filter(
    id => {
      const todo = state.todo.getById[id]
      return statusFilter(todo.data.completed)
        && queryFilter(todo.data.text)
    }
  )
}

export const TodoList = () => {
  const ids = useReduxSelector(todoListSelector)
  const classes = useStyles()

  if (ids.length > 0) {
    return <Paper className={classes.paper}>
        <List dense className={classes.list}>
          {ids.map((id, i) => (
            <TodoItem
              key={`TodoItem.${id}`}
              id={id}
              divider={i !== ids.length - 1}
            />
          ))}
        </List>
      </Paper>
  } else {
    return null
  }
}
