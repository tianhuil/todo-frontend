import React, { memo } from 'react';
import { Layout } from './Layout'
import { store, history } from '../store';
import { Provider } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router'
import { Status } from '../store/utils';
import { ConnectedRouter } from 'connected-react-router';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { DataLoader } from './DataLoader';


const App = memo(() => {
  return (
    <MuiThemeProvider theme={createMuiTheme()}>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <DataLoader>
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
          </DataLoader>
        </ConnectedRouter>
      </Provider>
    </MuiThemeProvider>
  )
})

export default App;
