import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

function PrivateRoute({ component: Cmp, isAuthenticated, ...rest }) {
  console.log(rest); // path, location, computedMatch...
  console.log(isAuthenticated);

  return (
    <Route
      {...rest}
      render={props => {
        console.log(props);
        return isAuthenticated ? (
          <Cmp {...props} /> // ...props is must since Cmp can use location, match, etc
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { redirect: props.location.pathname }
            }}
          />
        );
      }}
    />
  );
}

export default connect(state => {
  return { isAuthenticated: state.loginState.isAuthenticated };
})(PrivateRoute);
