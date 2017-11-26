// @flow
import React from 'react';
import { Route, Redirect } from 'react-router';

type Props = {
  component: any,
  pattern: string,
  exactly?: boolean,
  isAuthenticated: boolean,
  willAuthenticate: boolean,
}

const AuthenticatedRoute = ({
  pattern,
  exactly,
  isAuthenticated,
  willAuthenticate,
  component: Component,
}: Props) =>
  <Route
    exactly={exactly}
    pattern={pattern}
    render={(props) => {
      if (isAuthenticated) { return <Component {...props} />; }
      if (willAuthenticate) { return null; }
      if (!willAuthenticate && !isAuthenticated) { return <Redirect to={{ pathname: '/login' }} />; }
      return null;
    }}
  />;

export default AuthenticatedRoute;
