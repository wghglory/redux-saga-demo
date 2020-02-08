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
