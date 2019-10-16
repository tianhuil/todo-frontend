import React from 'react'

import { Id } from "../store/todos/type"
import { memo } from "react"
import { useReduxSelector } from "../store"
import { useDispatch } from "react-redux"
import { useTodoHandler } from "./DataHandler"
import { ListItem, Checkbox, ListItemText, ListItemSecondaryAction, IconButton } from "@material-ui/core"
import DeleteOutlined from '@material-ui/icons/DeleteOutlined'

interface ITodoProps {
  id: Id
  divider: boolean
}

export const TodoItem = memo((props: ITodoProps) => {
  const todo = useReduxSelector(state => state.todo.getById[props.id])
  const dispatch = useDispatch()
  const todoHandler = useTodoHandler()

  return <ListItem divider={props.divider}>
    <Checkbox
      onClick={() => todoHandler.modify(dispatch, {
        id: props.id,
        completed: !todo.data.completed,
      })}
      checked={todo.data.completed}
      disableRipple
    />
    <ListItemText primary={todo.data.text} />
    <ListItemSecondaryAction>
      <IconButton
        arial-label='Delete Todo'
        onClick={() => todoHandler.delete(dispatch,  props.id)}
      >
        <DeleteOutlined />
      </IconButton>
    </ListItemSecondaryAction>
  </ListItem>
})
