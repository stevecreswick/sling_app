// @flow
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import { Router, Route, Switch } from 'react-router'
import Home from '../Home';
import NotFound from '../../components/NotFound';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='*' component={NotFound}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
