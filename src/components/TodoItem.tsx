import React from 'react'

import { Id } from "../type"
import { memo } from "react"
import { useReduxSelector } from "../store"
import { useDispatch } from "react-redux"
import { useTodoHandler } from "./DataHandler"
import { ListItem, Checkbox, ListItemText, ListItemSecondaryAction, IconButton, Theme, makeStyles } from "@material-ui/core"
import DeleteOutlined from '@material-ui/icons/DeleteOutlined'
import Sync from '@material-ui/icons/Sync'

const useStyles = makeStyles((theme: Theme) => ({
  checkbox: {
    '&:checked': {
      color: theme.palette.secondary.main,
    },
  },
  delete: {
    color: theme.palette.grey[500],
  },
}))

interface ITodoProps {
  id: Id
  divider: boolean
}

export const TodoItem = memo((props: ITodoProps) => {
  const todo = useReduxSelector(state => state.todo.getById[props.id])
  const dispatch = useDispatch()
  const classes = useStyles()
  const todoHandler = useTodoHandler()

  return <ListItem role={undefined} button divider={props.divider}>
    <Checkbox
      onClick={() => todoHandler.modify(dispatch, {
        id: props.id,
        completed: !todo.data.completed,
      })}
      checked={todo.data.completed}
      className={classes.checkbox}
      disableRipple
    />
    <ListItemText primary={todo.data.text} />
    <ListItemSecondaryAction>
      <IconButton
        arial-label='Delete Todo'
        onClick={() => todoHandler.delete(dispatch,  props.id)}
      >
        { (!todo.synced) ? <Sync/> : null }
        <DeleteOutlined />
      </IconButton>
    </ListItemSecondaryAction>
  </ListItem>
})
