import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import { Status } from '../store'
import { push } from 'connected-react-router'
import { useDispatch } from 'react-redux'
import { Tooltip } from '@material-ui/core'

type StatusButtonProps = React.PropsWithChildren<{
  status: Status,
  tooltip: string,
}>

export const StatusButton: React.SFC<StatusButtonProps> = (props) => {
  const dispatch = useDispatch()

  return <Tooltip title={props.tooltip}>
    <IconButton onClick={() => dispatch(push(props.status))}>
        {props.children}
    </IconButton>
  </Tooltip>

}
