import { call, put, takeEvery } from 'redux-saga/effects'

const adminAuthFetch = async ({ login, pass }) => {
  const response = await fetch(`/admin-auth`, {
    method: 'POST',
    headers: { 'Content-Type': 'Application/json' },
    body: JSON.stringify({
      login: login,
      password: pass
    })
  })
  const reservations = await response.json()
  return reservations
}

function* fetchAdminAuth(action) {
  const session = yield call(adminAuthFetch, {
    login: action.payload.login,
    pass: action.payload.pass
  });
  if (session.answer === true) {
    yield put({ type: "AUTH_ANSWER", payload: session });
  } else {
    yield put({ type: "INIT_SESSION", payload: { session } });
  }
}


export function* adminAuthWatcher() {
  console.log('fetchAdminAuth');
  yield takeEvery("ADMIN_AUTH_FETCH", fetchAdminAuth);
}
