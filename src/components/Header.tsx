import React from 'react'
import { Toolbar, AppBar, Typography, Theme } from '@material-ui/core'
import CheckBoxOutlineBlank from '@material-ui/icons/CheckBoxOutlineBlank'
import CheckBox from '@material-ui/icons/CheckBox'
import { StatusButton } from './StatusButton'
import { Status } from '../store'
import makeStyles from '@material-ui/styles/makeStyles/makeStyles'
import { fade } from '@material-ui/core/styles/colorManipulator'
import { Query } from './Query'

const useStyles = makeStyles((theme: Theme) => ({
  logo: {
    color: fade(theme.palette.common.white, 0.9),
    display: 'none',
    flexGrow: 1,
    marginRight: theme.spacing() * 2,
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
  },
  root: {
    flexGrow: 1,
  },
  statusButtons: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
}))

export const Header: React.SFC = () => {
  const classes = useStyles()

  return <div className={classes.root}>
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h6' className={classes.logo}>
          Todo List
        </Typography>
        <Query/>
        <div className={classes.statusButtons}>
          <StatusButton status={Status.All} tooltip='View All'>
            All
          </StatusButton>
          <StatusButton status={Status.Completed} tooltip='View Completed'>
            <CheckBox/>
          </StatusButton>
          <StatusButton status={Status.Incompleted} tooltip='View Incompleted'>
            <CheckBoxOutlineBlank/>
          </StatusButton>
        </div>
      </Toolbar>
    </AppBar>
  </div>
}
