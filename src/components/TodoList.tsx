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
import { toggleTodo, deleteTodo } from '../store/todos/actions';
import { useReduxSelector, Status, State } from '../store';
import { useDispatch } from 'react-redux';

interface ITodoProps {
  id: number
  divider: boolean
}

const TodoListItem = memo((props: ITodoProps) => {
  const todo = useReduxSelector(state => state.todo.getById[props.id])
  const dispatch = useDispatch()

  return <ListItem divider={props.divider}>
    <Checkbox
      onClick={() => dispatch(toggleTodo(props.id))}
      checked={todo.completed}
      disableRipple
    />
    <ListItemText primary={todo.text} />
    <ListItemSecondaryAction>
      <IconButton arial-label='Delete Todo' onClick={() => dispatch(deleteTodo(props.id))}>
        <DeleteOutlined />
      </IconButton>
    </ListItemSecondaryAction>
  </ListItem>
})

function todoListSelector(state: State) {
  function statusFilter(completed: boolean) {
    switch(state.router.location.pathname) {
      case Status.All: return true
      case Status.Completed: return completed
      case Status.Incompleted: return !completed
      default: return true
    }
  }
  return state.todo.allIds.filter(id => statusFilter(state.todo.getById[id].completed))
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
