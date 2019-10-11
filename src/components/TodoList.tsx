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
import { Todo, toggleTodo, deleteTodo } from '../store/todos/actions';
import { useReduxSelector } from '../store';
import { useDispatch } from 'react-redux';

interface ITodoProps {
  id: number
  completed: boolean
  text: string
  divider: boolean
}

const TodoListItem = memo((props: ITodoProps) => {
  const dispatch = useDispatch()

  return <ListItem divider={props.divider}>
    <Checkbox
      onClick={() => dispatch(toggleTodo(props.id))}
      checked={props.completed}
      disableRipple
    />
    <ListItemText primary={props.text} />
    <ListItemSecondaryAction>
      <IconButton arial-label='Delete Todo' onClick={() => dispatch(deleteTodo(props.id))}>
        <DeleteOutlined />
      </IconButton>
    </ListItemSecondaryAction>
  </ListItem>
})

export const TodoList = () => {
  const todoState = useReduxSelector(state => state.todo)
  const todos = todoState.allIds.map(id => todoState.getById[id])

  if (todos.length > 0) {
    return <Paper style={{margin: 16}}>
      <List style={{ overflow: 'scroll'}}>
        {todos.map((todo, id) => (
          <TodoListItem
            { ...todo }
            key={`TodoItem.${id}`}
            id={id}
            divider={id !== todos.length - 1}
          />
        ))}
      </List>
    </Paper>
  } else {
    return null
  }
}
