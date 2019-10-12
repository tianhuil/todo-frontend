import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import { Status, useReduxSelector, stateStatusSelector } from '../store'
import { push } from 'connected-react-router'
import { useDispatch } from 'react-redux'
import { Tooltip, Theme, makeStyles } from '@material-ui/core'
import { fade } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => {
  const offWhite = fade(theme.palette.common.white, 0.5)

  const buttonSpacing = {
    padding: theme.spacing(),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing() * 2,
    },
  }

  return {
    active: {
      ...buttonSpacing,
      color: theme.palette.common.white,
    },
    root: {
      ...buttonSpacing,
      color: offWhite,
    },
  }
})

type StatusButtonProps = React.PropsWithChildren<{
  status: Status,
  tooltip: string,
}>

export const StatusButton: React.SFC<StatusButtonProps> = (props) => {
  const dispatch = useDispatch()
  const stateStatus = useReduxSelector(stateStatusSelector)
  const classes = useStyles()
  const className = (props.status === stateStatus) ? classes.active : classes.root

  return <Tooltip title={props.tooltip}>
    <IconButton className={className} onClick={() => dispatch(push(props.status))}>
        {props.children}
    </IconButton>
  </Tooltip>
}
