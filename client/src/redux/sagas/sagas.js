import { call, put, takeEvery } from 'redux-saga/effects'
import axios from 'axios';

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

const fetchAllCourses = async () => {
  const response = await
  fetch('/courses')
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

const fetchCategory = async ({ id }) => {

  const response = await fetch(`/categories/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'Application/json' },
    body: JSON.stringify({
      id,
    })
  })
  const category = await response.json()
  return category
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

const fetchEditCategory = async (obj) => {
  try {
    const response = await axios.put('/edit-category', obj, {
      headers: {
        'Content-Type':  'multipart/form-data'
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error editing category:', error);
    throw error;
  }
}

const fetchAddCategory = async (obj) => {
  try {
    const response = await axios.post('/categories', obj, {
      headers: {
        'Content-Type':  'multipart/form-data'
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error adding category:', error);
    throw error;
  }
};

const fetchAddCourse = async (obj) => {
  try {
    const response = await axios.post('/courses', obj, {
      headers: {
        'Content-Type':  'multipart/form-data'
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error adding course:', error);
    throw error;
  }
}

const fetchEditCourse = async (obj) => {
  try {
    const id = obj.get('id');
    const response = await axios.put(`/courses/${id}`, obj, {
      headers: {
        'Content-Type':  'multipart/form-data'
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error adding course:', error);
    throw error;
  }
  // const response = await fetch(`/courses/${obj.id}`, {
  //   method: 'PUT',
  //   headers: { 'Content-Type': 'Application/json' },
  //   body: JSON.stringify({
  //     obj,
  //   })
  // })
  // const course = await response.json()
  // return course
}

const fetchDeleteCourse = async (obj) => {
  const response = await fetch(`/courses/${obj.id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'Application/json' },
    body: JSON.stringify({
      obj,
    })
  })
  const course = await response.json()
  return course
} 

const fetchCourseVideos = async () => {
  const response = await
  fetch('/course-content')
  const courses = await response.json()
  return courses
}

const fetchCourseVideo =  async (obj) => {
  const response = await fetch(`/course-content`, {
    method: 'POST',
    headers: { 'Content-Type': 'Application/json' },
    body: JSON.stringify({
      obj,
    })
  })
  const course = await response.json()
  return course
}

const fetchEditCourseVideo =  async (obj) => {
  const response = await fetch(`/course-content/${obj.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'Application/json' },
    body: JSON.stringify({
      obj,
    })
  })
  const course = await response.json()
  return course
}

const fetchDeleteCourseVideo =  async (obj) => {
  const response = await fetch(`/course-content/${obj.id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'Application/json' },
    body: JSON.stringify({
      obj,
    })
  })
  const course = await response.json()
  return course
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

function* deleteFetchCategory(action) {
  const category = yield call(fetchCategory, { id: action.payload.id })
  yield put({ type: 'DELETE_CATEGORY', payload: { category } })
}

function* editFetchCategory(action) {
  const category = yield call(fetchEditCategory, action.payload)
  yield put({ type: 'EDIT_CATEGORY', payload: { category } })
}

function* addFetchCategory(action) {
  console.log(action.payload, 'action.payload')

  for (const pair of action.payload.entries()) {
    console.log(pair[0], pair[1], 'action.payload ke va');
  }
  const category = yield call(fetchAddCategory(action.payload))
  yield put({ type: 'ADD_CATEGORY', payload: { category } })
}

function* getFetchAllCourses() {
  const courses = yield call(fetchAllCourses)
  yield put({ type: 'INIT_COURSES', payload: { courses } })
}

function* addFetchCourse(action) {
  const courses = yield call(fetchAddCourse(action.payload))
  yield put({ type: 'ADD_COURSE', payload: { courses } })
}

function* editFetchCourse(action) {
  const courses = yield call(fetchEditCourse(action.payload))
  yield put({ type: 'EDIT_COURSE', payload: { courses } })
}

function* deleteFetchCourse(action) {
  const course = yield call(fetchDeleteCourse({ id: action.payload.id }))
  yield put({ type: 'DELETE_COURSE', payload: { course } })
}

function* getFetchCourseVideos() {
  const courseContentList = yield call(fetchCourseVideos)
  yield put({ type: 'INIT_COURSE_CONTENT_LIST', payload: { courseContentList } })
}

function* addFetchCourseVideo(action) {
  yield call(fetchCourseVideo(action.payload))
}

function* editFetchCourseVideo(action) {
  yield call(fetchEditCourseVideo(action.payload))
}

function* deleteFetchCourseVideo(action) {
  yield call(fetchDeleteCourseVideo(action.payload))
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
  yield takeEvery("DELETE_FETCH_CATEGORY", deleteFetchCategory);
  yield takeEvery("EDIT_FETCH_CATEGORY", editFetchCategory);
  yield takeEvery("ADD_FETCH_CATEGORY", addFetchCategory);
  yield takeEvery("GET_FETCH_ALL_COURSES", getFetchAllCourses);
  yield takeEvery("ADD_FETCH_COURSE", addFetchCourse);
  yield takeEvery("EDIT_FETCH_COURSE", editFetchCourse);
  yield takeEvery("DELETE_FETCH_COURSE", deleteFetchCourse);
  yield takeEvery("GET_ALL_COURSE_VIDEOS", getFetchCourseVideos);
  yield takeEvery("ADD_FETCH_COURSE_VIDEO", addFetchCourseVideo);
  yield takeEvery("EDIT_FETCH_COURSE_VIDEO", editFetchCourseVideo);
  yield takeEvery("DELETE_FETCH_COURSE_VIDEO", deleteFetchCourseVideo);
}

export default mySaga;
