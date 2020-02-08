# redux-saga vs redux-thunk

## [redux-saga](https://redux-saga.js.org/)

1. mySaga.js:

```js
// call： 调⽤异步操作 put：状态更新 takeEvery：做saga监听
import { call, put, takeEvery } from 'redux-saga/effects';

// 模拟登录接⼝
const UserService = {
  login(username) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username === 'derek') {
          resolve({ username: 'derek' });
        } else {
          reject('Username should be derek!');
        }
      }, 1000);
    });
  }
};

//worker saga
function* loginHandler(action) {
  try {
    yield put({ type: 'REQUEST_LOGIN' });
    const res = yield call(UserService.login, action.username);
    yield put({ type: 'LOGIN_SUCCESS', res }); // resovle res: { username: 'derek' }
  } catch (error) {
    // UserService reject error
    yield put({ type: 'LOGIN_FAILTURE', error });
  }
}

//watcher saga
function* mySaga() {
  yield takeEvery('LOGIN_SAGA', loginHandler);
}

export default mySaga;

/* STEPs
1. login button click
2. trigger saga action LOGIN
3. takeEvery call loginHandler
4. loginHandler put/dispatch action OR call/send API and then dispatch action according to res
*/
```

2. store/index.js:

```js
import { createStore, combineReducers, applyMiddleware } from 'redux';

import createSagaMiddleware from 'redux-saga';
import mySaga from './mySaga';
const sagaMiddleware = createSagaMiddleware();

// ...

const store = createStore(
  combineReducers({ loginState: loginReducer }),
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(mySaga);

export default store;
```

3. Saga Usage: LoginPage.js

```diff
import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Redirect } from 'react-router-dom';

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

-  // thunk: action is a function
-  // dispatch => ({
-  //   login: username => dispatch(login(username))
-  // })

+  // saga: action is plain object; LOGIN_SAGA is saga listenning type, not an action
+  {
+    login: username => ({ username, type: 'LOGIN_SAGA' })
+  }
)(LoginPage);
```
