import React from 'react'

import { Theme, InputBase, IconButton, makeStyles } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import { fade } from '@material-ui/core/styles/colorManipulator'
import { useSelector, useDispatch } from 'react-redux'
import { stateQuerySelector, filterPush } from '../store'

const useStyles = makeStyles((theme: Theme) => ({
  search: {
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    backgroundColor: fade(theme.palette.common.white, 0.15),
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    position: 'relative',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 300,
    },
  },
  searchInput: {
    color: 'inherit',
    flexGrow: 1,
    marginLeft: 8,
    width: '100%',
  },
  searchIcon: {
    color: 'inherit',
    flexGrow: 0,
    padding: theme.spacing(),
  },
}))

export const Query: React.SFC = () => {
  const classes = useStyles({})
  const dispatch = useDispatch()
  const stateQuery = useSelector(stateQuerySelector)

  return <div className={classes.search}>
    <InputBase
      className={classes.searchInput}
      placeholder='Search&hellip;'
      value={stateQuery}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
        dispatch(filterPush({query: event.target.value}))
      }
    />
    <IconButton className={classes.searchIcon} aria-label='Search'>
      <SearchIcon />
    </IconButton>
  </div>
}
