import React, { useRef } from 'react';
import { TextField, Paper, Button, Grid, makeStyles, Theme } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useTodoHandler } from './DataHandler';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(2)
  },
  inputGrid: {
    paddingRight: theme.spacing(2),
  },
  submitGrid: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
}))

export const AddTodo = () => {
  const inputField = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch()
  const todoHandler = useTodoHandler()
  const classes = useStyles()

  function submitTodo() {
    todoHandler.new(dispatch, inputField.current!.value)
    inputField.current!.value = ''
  }

  function keyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.which === 13 || event.keyCode === 13) {
      submitTodo()
      return true
    } else {
      return false
    }
  }

  return <Paper className={classes.paper} >
    <Grid container>
      <Grid xs={10} md={11} item className={classes.inputGrid}>
        <TextField
          inputRef={inputField}
          placeholder='Add Todo here'
          onKeyPress={keyPress}
          fullWidth
        />
      </Grid>
      <Grid xs={2} md={1} item className={classes.submitGrid} >
        <Button
          color='secondary'
          variant='outlined'
          onClick={submitTodo}
        >
          Add
        </Button>
      </Grid>
    </Grid>
  </Paper>
}
