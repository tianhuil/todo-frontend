import React from 'react';
import { Layout } from './Layout'
import { TodoList } from './TodoList'
import { AddTodo } from './AddTodo';
import { store, history } from '../store';
import { Provider } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router'
import { Status } from '../store/utils';
import { ConnectedRouter } from 'connected-react-router';
import { Header } from './Header'

const Body = () => (
  <Layout>
    <Header/>
    <AddTodo/>
    <TodoList/>
  </Layout>
)

const App = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path={Status.All} render={Body}/>
          <Route exact path={Status.Completed} render={Body}/>
          <Route exact path={Status.Incompleted} render={Body}/>
          <Redirect to={Status.All} />
        </Switch>
      </ConnectedRouter>
    </Provider>
  )
}

export default App;
