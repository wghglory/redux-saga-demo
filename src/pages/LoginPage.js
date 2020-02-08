import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Redirect } from 'react-router-dom';

// import { login } from '../store';  // thunk action

function LoginPage(props) {
  const [username, setUsername] = useState('');

  const { location } = props;

  const redirect = (location.state && location.state.redirect) || '/'; // redirect address

  if (props.loginState.isAuthenticated) {
    return <Redirect to={redirect} />;
  }

  return (
    <>
      <h2>Login Page</h2>
      <input value={username} onChange={e => setUsername(e.target.value)} />
      <button onClick={() => props.login(username)}>
        {props.loginState.loading ? 'Login...' : 'Login'}
      </button>
      <p style={{ color: 'red' }}>{props.loginState.error}</p>
    </>
  );
}

export default connect(
  state => ({
    loginState: state.loginState
  }),

  // thunk: action is a function
  // dispatch => ({
  //   login: username => dispatch(login(username))
  // })

  // saga: action is plain object; LOGIN_SAGA is saga listenning type, not an action
  {
    login: username => ({ username, type: 'LOGIN_SAGA' })
  }
)(LoginPage);
