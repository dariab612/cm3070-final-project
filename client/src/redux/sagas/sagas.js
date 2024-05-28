import { call, put, takeEvery } from 'redux-saga/effects'

const fetchCategories = async () => {
  const response = await fetch('/categories')
  const categories = await response.json()
  return categories
}

const fetchCourses = async ({ id }) => {
  const response = await
    fetch(`/categories/${id}`)
  const courses = await response.json()
  return courses
}

const fetchCourseContentList = async ({ id }) => {
  const response = await
    fetch(`/course-content/${id}`)
  const courseContentList = await response.json()
  return courseContentList
}

const fetchAddReview = async ({ obj }) => {

  const response = await fetch(`/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'Application/json' },
    body: JSON.stringify({
      obj,
    })
  })
  const review = await response.json()
  return review
}

const fetchReview = async ({ id }) => {

  const response = await fetch(`/reviews/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'Application/json' },
    body: JSON.stringify({
      id,
    })
  })
  const review = await response.json()
  return review
}

const fetchApproveReview = async ({ id }) => {

  const response = await fetch(`/reviews/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'Application/json' },
    body: JSON.stringify({
      id,
    })
  })

  const review = await response.json()
  return review
}

const fetchEditReview = async ({ obj }) => {
  const response = await fetch(`/edit-review`, {
    method: 'PUT',
    headers: { 'Content-Type': 'Application/json' },
    body: JSON.stringify({
      obj,
    })
  })
  const review = await response.json()
  return review
}

const fetchAddViewedVideos = async ({ obj }) => {
  const response = await fetch(`/viewed-videos`, {
    method: 'POST',
    headers: { 'Content-Type': 'Application/json' },
    body: JSON.stringify({
      obj,
    })
  })
  const viewed_video = await response.json()
  return viewed_video
}

const fetchUpdateOrCreateViewedVideos = async ({ obj }) => {
  const response = await fetch(`/played-viewed-videos`, {
    method: 'POST',
    headers: { 'Content-Type': 'Application/json' },
    body: JSON.stringify({
      obj,
    })
  })
  const viewed_video = await response.json()
  return viewed_video
}


const fetchUpdateOrCreateViewedVideosMax = async ({ obj }) => {
  const response = await fetch(`/max-played-viewed-videos`, {
    method: 'POST',
    headers: { 'Content-Type': 'Application/json' },
    body: JSON.stringify({
      obj,
    })
  })
  const viewed_video = await response.json()
  return viewed_video
}

const fetchUpdateOrCreateViewedVideosTotal = async ({ obj }) => {
  const response = await fetch(`/viewed-videos-total-seconds`, {
    method: 'POST',
    headers: { 'Content-Type': 'Application/json' },
    body: JSON.stringify({
      obj,
    })
  })
  const viewed_video = await response.json()
  return viewed_video
}

const fetchGetViewedVideos = async({ courseContentId }) => {
  const response = await fetch(`/viewed-videos?courseContentId=${courseContentId}`)
  const viewedVideos = await response.json()
  return viewedVideos
}

function* getFetchCategories() {
  const categories = yield call(fetchCategories);
  yield put({ type: "INIT_CATEGORIES", payload: categories });
}

function* getFetchCourses(action) {
  const courses = yield call(fetchCourses, { id: action.payload.id })
  yield put({ type: "INIT_COURSES", payload: { courses } })
}

function* getFetchCourseContentList(action) {
  const courseContentList = yield call(fetchCourseContentList, { id: action.payload.id })
  yield put({ type: 'INIT_COURSE_CONTENT_LIST', payload: { courseContentList } })
}

function* addFetchReview(action) {
  const review = yield call(fetchAddReview, { obj: action.payload })
  yield put({ type: 'ADD_REVIEW', payload: { review } })
}

function* deleteFetchReview(action) {
  const review = yield call(fetchReview, { id: action.payload.reviewId })
  yield put({ type: 'DELETE_REVIEW', payload: { review } })
}

function* getApproveFetchReview(action) {
  const review = yield call(fetchApproveReview, { id: action.payload.reviewId })
  yield put({ type: 'CHANGE_STATUS_REVIEW', payload: { review } })
}

function* getEditFetchReview(action) {
  const review = yield call(fetchEditReview, { obj: action.payload })
  yield put({ type: 'UPDATE_REVIEW', payload: { review } })
}

function* addFetchViewedVideos(action) {
  const viewedVideos = yield call(fetchAddViewedVideos, { obj: action.payload })
  yield put({ type: 'ADD_VIEWED_VIDEOS', payload: { viewedVideos } })
}

function* updateViewedVideoProgress(action) {
  yield call(fetchUpdateOrCreateViewedVideos, { obj: action.payload })
}

function* getViewedVideoProgressFetch(action)  {
  const viewedVideos = yield call(fetchGetViewedVideos, { courseContentId: action.payload.courseContentId })
  if (viewedVideos.length) {
    yield put({ type: 'INIT_VIEWED_VIDEO_PROGRESS', payload: { viewedVideos } })
  }
}

function* updateViewedVideoMaxProgress(action) {
  yield call(fetchUpdateOrCreateViewedVideosMax, { obj: action.payload })
}


function* updateViewedVideoTotalSeconds(action) {
  yield call(fetchUpdateOrCreateViewedVideosTotal, { obj: action.payload })
}
export function* mySaga() {
  yield takeEvery('GET_FETCH_CATEGORIES', getFetchCategories);
  yield takeEvery('GET_FETCH_COURSES', getFetchCourses);
  yield takeEvery('GET_FETCH_COURSE_CONTENT_LIST', getFetchCourseContentList)
  yield takeEvery("ADD_FETCH_REVIEW", addFetchReview);
  yield takeEvery("DELETE_FETCH_REVIEW", deleteFetchReview);
  yield takeEvery("APPROVE_FETCH_REVIEW", getApproveFetchReview);
  yield takeEvery("EDIT_FETCH_REVIEW", getEditFetchReview);
  yield takeEvery("ADD_FETCH_VIEWED_VIDEOS", addFetchViewedVideos);
  yield takeEvery("UPDATE_VIEWED_VIDEO_PROGRESS", updateViewedVideoProgress);
  yield takeEvery('GET_VIEWED_VIDEO_PROGRESS_FETCH', getViewedVideoProgressFetch);
  yield takeEvery("UPDATE_VIEWED_VIDEO_MAX_PROGRESS", updateViewedVideoMaxProgress);
  yield takeEvery("UPDATE_VIEWED_VIDEO_TOTAL_SECONDS", updateViewedVideoTotalSeconds);
}

export default mySaga;
