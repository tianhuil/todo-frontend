import React, { useEffect, memo } from 'react';
import { Layout } from './Layout'
import { TodoList } from './TodoList'
import { AddTodo } from './AddTodo';
import { store, history, subscribeToFirestore } from '../store';
import { Provider, useDispatch } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router'
import { Status } from '../store/utils';
import { ConnectedRouter } from 'connected-react-router';
import { Header } from './Header'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const Body = () => {
  return <Layout>
    <Header/>
    <AddTodo/>
    <TodoList/>
  </Layout>
}


export const DataLoader = (props: React.PropsWithChildren<{}>) => {
  const dispatch = useDispatch()
  useEffect(
    () => subscribeToFirestore(dispatch)
  )

  return <div>
    {props.children || null}
  </div>
};


const App = memo(() => {
  return (
    <MuiThemeProvider theme={createMuiTheme()}>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <DataLoader>
            <Switch>
              <Route exact path={Status.All} render={Body}/>
              <Route exact path={Status.Completed} render={Body}/>
              <Route exact path={Status.Incompleted} render={Body}/>
              <Redirect to={Status.All} />
            </Switch>
          </DataLoader>
        </ConnectedRouter>
      </Provider>
    </MuiThemeProvider>
  )
})

export default App;
