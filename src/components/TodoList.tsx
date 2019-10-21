import React from 'react';

import { List, Paper, Theme } from '@material-ui/core'
import { useReduxSelector, Status, State, filterSelector } from '../store';
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
  const filter = filterSelector(state)

  function statusFilter(completed: boolean) {
    switch(filter.status) {
      case Status.All: return true
      case Status.Completed: return completed
      case Status.Incompleted: return !completed
    }
  }

  function substrFilter(substr: string, text: string) {
    return substr
        ? text.toLowerCase()
              .includes(substr.toLowerCase())
        : true
  }

  return state.todo.allIds.filter(
    id => {
      const todo = state.todo.getById[id]
      return statusFilter(todo.data.completed)
        && substrFilter(filter.query, todo.data.text)
        && substrFilter(filter.hash,  todo.data.text)
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
