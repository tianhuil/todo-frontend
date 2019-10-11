import React, { memo, useRef } from 'react';
import { TextField, Paper, Button, Grid } from '@material-ui/core';

interface IAddTodoProps {
  addTodo: (text: string) => void
}

export const AddTodo = memo((props: IAddTodoProps) => {
  const inputField = useRef<HTMLInputElement>(null)

  function submitTodo() {
    props.addTodo(inputField.current!.value)
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
})
