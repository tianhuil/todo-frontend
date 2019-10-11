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
import { Todo } from '../store/todos/actions';

interface ITodoProps {
  onCheckBoxToggle: () => void
  onButtonClick: () => void
  completed: boolean
  text: string
  divider: boolean
}

const TodoListItem = memo((props: ITodoProps) => (
  <ListItem divider={props.divider}>
    <Checkbox
      onClick={props.onCheckBoxToggle}
      checked={props.completed}
      disableRipple
    />
    <ListItemText primary={props.text} />
    <ListItemSecondaryAction>
      <IconButton arial-label='Delete Todo' onClick={props.onButtonClick}>
        <DeleteOutlined />
      </IconButton>
    </ListItemSecondaryAction>
  </ListItem>
))

interface ITooListProps {
  todos: Todo[]
  onItemRemove: (id: number) => void
  onItemCheck: (id: number) => void
}

export const TodoList = memo((props: ITooListProps) => (
  <>
    {props.todos.length > 0 && (
      <Paper style={{margin: 16}}>
        <List style={{ overflow: 'scroll'}}>
          {props.todos.map((todo, id) => (
            <TodoListItem
              { ...todo }
              key={`TodoItem.${id}`}
              divider={id !== props.todos.length - 1}
              onButtonClick={() => props.onItemRemove(id)}
              onCheckBoxToggle={() => props.onItemCheck(id)}
            />
          ))}
        </List>
      </Paper>
    )}
  </>
))
