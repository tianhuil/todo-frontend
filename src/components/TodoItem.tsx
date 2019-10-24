import * as React from 'react'

import { Id } from "../type"
import { memo } from "react"
import { useReduxSelector } from "../store"
import { useDispatch } from "react-redux"
import { Link as RouterLink } from 'react-router-dom'
import { useTodoHandler } from "./Firestore"
import { ListItem, Checkbox, ListItemText, ListItemSecondaryAction, IconButton, Theme, makeStyles, Link as MuiLink, Typography } from "@material-ui/core"
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

interface ILinkProps {
  to: {
    pathname?: string
    search?: string
    hash?: string
  }
}

const ForwardedRouterLink = React.forwardRef<HTMLAnchorElement, ILinkProps>(
  (props, ref) => <RouterLink innerRef={ref} {...props} />
)

const Link = (props: React.PropsWithChildren<ILinkProps>) => {
  return <MuiLink component={ForwardedRouterLink} to={props.to}>
    {props.children}
  </MuiLink>
}

function linkHashtag(text: string): (string | JSX.Element)[] {
  const words = text.split(' ').map(
    (word, key) => word.startsWith('#')
      ? <Link key={key} to={{hash: word}}>{word}</Link>
      : word
  )
  const result = new Array(words.length * 2 - 1)
  words.forEach((word, i) => {
    result[2 * i] = word
  })
  for (let i=1; i< result.length; i += 2) {
    result[i] = ' '
  }
  return result
}

export const TodoItem = memo((props: ITodoProps) => {
  const todo = useReduxSelector(state => state.todo.getById[props.id])
  const dispatch = useDispatch()
  const classes = useStyles()
  const todoHandler = useTodoHandler()

  return <ListItem role={undefined} button divider={props.divider}>
    <Checkbox
      onClick={() => dispatch(todoHandler.update({
        id: props.id,
        completed: !todo.data.completed,
      }))}
      checked={todo.data.completed}
      className={classes.checkbox}
      disableRipple
    />
    <ListItemText>
      <Typography>
        {linkHashtag(todo.data.text)}
      </Typography>
    </ListItemText>
    <ListItemSecondaryAction>
      <IconButton
        arial-label='Delete Todo'
        onClick={() => dispatch(todoHandler.delete(props.id))}
      >
        { (!todo.synced) ? <Sync/> : null }
        <DeleteOutlined />
      </IconButton>
    </ListItemSecondaryAction>
  </ListItem>
})
