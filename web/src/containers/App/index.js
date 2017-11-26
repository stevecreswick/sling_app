// @flow
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { authenticate, unauthenticate } from '../../actions/session';
import Home from '../Home';
import Login from '../Login';
import Signup from '../Signup';
import NotFound from '../../components/NotFound';
import AuthenticatedRoute from '../../components/AuthenticatedRoute';
import AuthenticationRedirect from '../../components/AuthenticationRedirect';

type Props = {
  authenticate: () => void,
  unauthenticate: () => void,
  isAuthenticated: boolean,
  willAuthenticate: boolean
}

class App extends Component {
  componentDidMount() {
    const token = localStorage.getItem('token');

    if (token) {
      this.props.authenticate();
    }
    else {
      this.props.unauthenticate();
    }
  }

  props: Props

  render() {
    const { isAuthenticated, willAuthenticate } = this.props;
    const authProps = { isAuthenticated, willAuthenticate };

    return (
      <Router>
        <div style={{ display: 'flex', flex: '1' }}>
          <Switch>
            <AuthenticatedRoute exact path='/' component={ Home } { ...authProps }/>
            <AuthenticationRedirect path="/login" component={ Login } { ...authProps }/>
            <AuthenticationRedirect path="/signup" component={ Signup } { ...authProps }/>
            <Route path='*' component={ NotFound }/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default connect(
  state => ({
    isAuthenticated: state.session.isAuthenticated,
    willAuthenticate: state.session.willAuthenticate,
  }),
  { authenticate, unauthenticate }
)(App);
