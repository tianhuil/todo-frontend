import React, { memo } from 'react';
import { TextField, Paper, Button, Grid } from '@material-ui/core';

interface IAddTodoProps {
  inputValue: string
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onInputKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void
  onButtonClick: () => void
}

export const AddTodo = memo((props: IAddTodoProps) => (
  <Paper style={{margin: 16, padding: 16}}>
    <Grid container>
      <Grid xs={10} md={11} item style={{paddingRight: 16}}>
        <TextField
          placeholder='Add Todo here'
          value={props.inputValue}
          onChange={props.onInputChange}
          onKeyPress={props.onInputKeyPress}
          fullWidth
        />
      </Grid>
      <Grid xs={2} md={1} item>
        <Button
          color='secondary'
          variant='outlined'
          onClick={props.onButtonClick}
        >
          Add
        </Button>
      </Grid>
    </Grid>
  </Paper>
))
