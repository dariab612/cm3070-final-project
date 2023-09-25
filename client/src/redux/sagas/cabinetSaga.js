import { call, put, takeEvery } from 'redux-saga/effects'

const CabinetFetch = async () => {
  console.log('CabinetFetch')
  const response = await fetch(`/profile`)
  const responseJson = await response.json()
  console.log(responseJson, 'responseJson')
  return responseJson
}

function* fetchCabinet() {
  console.log('function* fetchCabinet')
  const viewedVideos = yield call(CabinetFetch);
  yield put({ type: "INIT_CABINET", payload: viewedVideos });
}


export function* cabinetWatcher() {
  console.log('function* cabinetWatcher')
  yield takeEvery("CABINET_FETCH", fetchCabinet);
}
