import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import Startup from './containers/Startup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import startups from './reducers/startups.js';
import {Provider} from 'react-redux'
import reduxThunk from 'redux-thunk'
import "assets/css/nucleo-icons.css";
import "assets/scss/blk-design-system-react.scss?v=1.2.0";
import "assets/css/mystyle.css";
import "assets/demo/demo.css";

const store = createStore(combineReducers({startups}),applyMiddleware(reduxThunk));
store.dispatch({
  type:'SET_STARTUPS',
  startups:[ ]
})
console.log(store.getState())

ReactDOM.render(
  <Provider store={store}>
  <React.StrictMode>
    <BrowserRouter>
      <App>
        <Switch>
          <Route exact path="/" component={() => <Redirect to='/startups' />}></Route>
          <Route path="/startups" component={Startup}></Route>
          <Route component={() => <Redirect to='/startups' />}></Route>
        </Switch>
      </App>
    </BrowserRouter>
  </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

