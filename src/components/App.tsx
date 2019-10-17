import React, { memo } from 'react';
import { Layout } from './Layout'
import { store, history } from '../store';
import { Provider } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router'
import { Status } from '../store/utils';
import { ConnectedRouter } from 'connected-react-router';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Firestore } from './Firestore';
import { LoginRequired } from './LoginRequired';
import { initializeFirestoreOnce } from '../firestore';


const App = memo(() => {
  initializeFirestoreOnce()

  return (
    <MuiThemeProvider theme={createMuiTheme()}>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <LoginRequired>
            <Firestore>
              <Switch>
                <Route exact path={Status.All}>
                  <Layout/>
                </Route>
                <Route exact path={Status.Completed}>
                  <Layout/>
                </Route>
                <Route exact path={Status.Incompleted}>
                  <Layout/>
                </Route>
                <Redirect to={Status.All} />
              </Switch>
            </Firestore>
          </LoginRequired>
        </ConnectedRouter>
      </Provider>
    </MuiThemeProvider>
  )
})

export default App;
