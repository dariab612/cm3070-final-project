import { call, put, takeEvery } from 'redux-saga/effects'

const adminChangePassFetch = async ({ oldPass, newPass, newPass2 }) => {
  const response = await fetch(`/adminpasschange`, {
    method: 'POST',
    headers: { 'Content-Type': 'Application/json' },
    body: JSON.stringify({
      oldPass,
      newPass,
      newPass2,
    })
  })
  const result = await response.json()
  return result
}

function* fetchAdminChangePass(action) {
  const result = yield call(adminChangePassFetch, {
    oldPass: action.payload.oldPass,
    newPass: action.payload.newPass,
    newPass2: action.payload.newPass2,

  });
  yield put({ type: "CHANGE_PASS", payload: { result } });
}


export function* adminChangePassWatcher() {
  yield takeEvery("ADMIN_CHANGE_PASS_FETCH", fetchAdminChangePass);
}
