import { createStore, combineReducers, applyMiddleware } from 'redux';

// import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import mySaga from './mySaga';
const sagaMiddleware = createSagaMiddleware();

const initialState = {
  loading: false,
  isAuthenticated: false,
  username: '',
  error: null
};

// REDUCER: when use combineReducers, each reducer must pass initial state or null for it
export function loginReducer(state = initialState, action) {
  switch (action.type) {
    case 'REQUEST_LOGIN':
      return { loading: true, isAuthenticated: false, username: '', error: null };
    case 'LOGIN_SUCCESS':
      return { loading: false, isAuthenticated: true, username: action.name };
    case 'LOGIN_FAILTURE':
      return { loading: false, isAuthenticated: false, username: action.name, error: action.error };
    case 'LOGOUT':
      return { loading: false, isAuthenticated: false, username: '' };
    default:
      return state;
  }
}

// ACTION thunk
export function login(username) {
  return dispatch => {
    dispatch({ type: 'REQUEST_LOGIN' });

    setTimeout(() => {
      if (username === 'derek') {
        dispatch({ type: 'LOGIN_SUCCESS', username });
      } else {
        dispatch({ type: 'LOGIN_FAILTURE', error: 'Username should be derek' });
      }
    }, 2000);
  };
}

export const logout = () => dispatch => {
  setTimeout(() => {
    dispatch({ type: 'LOGOUT' });
  }, 1000);
};

// const store = createStore(combineReducers({ loginState: loginReducer }), applyMiddleware(thunk));

const store = createStore(
  combineReducers({ loginState: loginReducer }),
  applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(mySaga);

export default store;
