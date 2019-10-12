import React from 'react'
import { Toolbar, AppBar, Typography } from '@material-ui/core'
import CheckBoxOutlineBlank from '@material-ui/icons/CheckBoxOutlineBlank'
import CheckBox from '@material-ui/icons/CheckBox'
import { StatusButton } from './StatusButton'
import { Status } from '../store'

export const Header: React.SFC = () => {
  return <AppBar position='static'>
    <Toolbar>
      <Typography variant='h6'>
        Todo List
      </Typography>
      <StatusButton status={Status.All} tooltip='View All'>
        All
      </StatusButton>
      <StatusButton status={Status.Completed} tooltip='View Completed'>
        <CheckBox/>
      </StatusButton>
      <StatusButton status={Status.Incompleted} tooltip='View Incompleted'>
        <CheckBoxOutlineBlank/>
      </StatusButton>
    </Toolbar>
  </AppBar>
}
