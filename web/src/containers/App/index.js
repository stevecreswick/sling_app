// @flow
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { authenticate, unauthenticate, logout } from '../../actions/session';
import Home from '../Home';
import Login from '../Login';
import Signup from '../Signup';
import NotFound from '../../components/NotFound';
import AuthenticatedRoute from '../../components/AuthenticatedRoute';
import PublicRoute from '../../components/PublicRoute';
import Sidebar from '../../components/Sidebar';
import Room from '../Room';

type Props = {
  authenticate: () => void,
  unauthenticate: () => void,
  isAuthenticated: boolean,
  willAuthenticate: boolean,
  logout: () => void,
  currentUserRooms: Array
}

const routes = {
  /*
    Public
      /login
      /signup

    Private
      /
      /r/:id
  */

  public: [
    {
      path: '/login',
      exact: true,
      main: Login
      // sidebar: () => <div>home!</div>,
    },
    {
      path: '/signup',
      exact: true,
      main: Signup
      // sidebar: () => <div>home!</div>,
    },
  ],
  authenticated: [
    {
      path: '/',
      exact: true,
      main: Home
      // sidebar: () => <div>home!</div>,
    },
    {
      path: '/r/:id',
      main: Room
      // sidebar: () => <div>bubblegum!</div>,
    }
  ]
}

console.log(routes);

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

  handleLogout = router => this.props.logout(router);

  render() {
    const { isAuthenticated, willAuthenticate, currentUserRooms } = this.props;
    const authProps = { isAuthenticated, willAuthenticate };

    return (
      <Router>
        <div style={{ display: 'flex', flex: '1' }}>
          {/* <Sidebar
            // router={router}
            rooms={currentUserRooms}
            onLogoutClick={this.handleLogout}
          /> */}



          <Switch>
            {/* Private Routes */}
            {/* <AuthenticatedRoute exact path='/' component={ Home } { ...authProps }/>
            <AuthenticatedRoute pattern="/r/:id" component={ Room } { ...authProps } /> */}

            { routes.authenticated.map((route, index) => (
              <AuthenticatedRoute
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.main}
                { ...authProps }
              />
            ))}

            {/* Public Routes */}
            {/* <AuthenticationRedirect path="/login" component={ Login } { ...authProps }/>
            <AuthenticationRedirect path="/signup" component={ Signup } { ...authProps }/> */}
            { routes.public.map((route, index) => (
              <PublicRoute
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.main}
                { ...authProps }
              />
            ))}

            {/* 404 */}
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
    currentUserRooms: state.rooms.currentUserRooms
  }),
  { authenticate, unauthenticate, logout }
)(App);
