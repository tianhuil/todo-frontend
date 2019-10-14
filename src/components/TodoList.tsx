import React, { memo } from 'react';

import {
  List,
  ListItem,
  Checkbox,
  IconButton,
  ListItemText,
  ListItemSecondaryAction,
  Paper,
} from '@material-ui/core'
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';
import { useReduxSelector, Status, State, Id, stateStatusSelector, stateQuerySelector } from '../store';
import { useDispatch } from 'react-redux';
import { useTodoHandler } from './DataHandler';

interface ITodoProps {
  id: Id
  divider: boolean
}

const TodoListItem = memo((props: ITodoProps) => {
  const todo = useReduxSelector(state => state.todo.getById[props.id])
  const dispatch = useDispatch()
  const todoHandler = useTodoHandler()

  return <ListItem divider={props.divider}>
    <Checkbox
      onClick={() => todoHandler.modify(dispatch, {
        id: props.id,
        completed: !todo.completed,
      })}
      checked={todo.completed}
      disableRipple
    />
    <ListItemText primary={todo.text} />
    <ListItemSecondaryAction>
      <IconButton
        arial-label='Delete Todo'
        onClick={() => todoHandler.remove(dispatch,  props.id)}
      >
        <DeleteOutlined />
      </IconButton>
    </ListItemSecondaryAction>
  </ListItem>
})

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
      const todo =state.todo.getById[id]
      return statusFilter(todo.completed)
        && queryFilter(todo.text)
    }
  )
}

export const TodoList = () => {
  const ids = useReduxSelector(todoListSelector)

  if (ids.length > 0) {
    return <Paper style={{margin: 16}}>
      <List style={{ overflow: 'scroll'}}>
        {ids.map((id, i) => (
          <TodoListItem
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
