import React, { useRef } from 'react';
import { TextField, Paper, Button, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { addTodo } from '../store';

export const AddTodo = () => {
  const inputField = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch()

  function submitTodo() {
    dispatch(addTodo(inputField.current!.value))
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

  return <Paper style={{margin: 16, padding: 16}}>
    <Grid container>
      <Grid xs={10} md={11} item style={{paddingRight: 16}}>
        <TextField
          inputRef={inputField}
          placeholder='Add Todo here'
          onKeyPress={keyPress}
          fullWidth
        />
      </Grid>
      <Grid xs={2} md={1} item>
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
