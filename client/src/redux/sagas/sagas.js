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
        'Content-Type': 'multipart/form-data'
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
        'Content-Type': 'multipart/form-data'
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
        'Content-Type': 'multipart/form-data'
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
        'Content-Type': 'multipart/form-data'
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error adding course:', error);
    throw error;
  }
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

const fetchCourseVideo = async (obj) => {
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

const fetchEditCourseVideo = async (obj) => {
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

const fetchDeleteCourseVideo = async (obj) => {
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

const fetchGetViewedVideos = async ({ courseContentId }) => {
  const response = await fetch(`/viewed-videos?courseContentId=${courseContentId}`)
  const viewedVideos = await response.json()
  return viewedVideos
}

const fetchGetReviews = async () => {
  const response = await fetch(`/reviews`)
  const reviews = await response.json()
  return reviews
}

const fetchPostSignUp = async (obj) => {
  try {
    const response = await fetch(`/sign-up`, {
      method: 'POST',
      headers: { 'Content-Type': 'Application/json' },
      body: JSON.stringify({
        obj,
      })
    })
    const signup = await response.json()
    return signup
  } catch(e) {
  }
}

const fetchPostSignIn = async (obj) => {
  const response = await fetch(`/sign-in`, {
    method: 'POST',
    headers: { 'Content-Type': 'Application/json' },
    body: JSON.stringify({
      obj,
    })
  })
  const signup = await response.json()
  return signup
}

const fetchCreateCertificate = async (obj) => {
  await fetch(`/create-certificate`, {
    method: 'POST',
    headers: { 'Content-Type': 'Application/json' },
    body: JSON.stringify({
      obj,
    })
  })
}

const fetchIncreaseCourseWatchers = async (obj) => {
  await fetch(`/courses/${obj.courseId}/number-of-viewers`, {
    method: 'PUT',
    headers: { 'Content-Type': 'Application/json' },
    body: JSON.stringify({
      obj,
    })
  })
}

const fetchAddReviewRating = async (obj) => {
  await fetch(`/courses/${obj.courseId}/rating-and-review`, {
    method: 'PUT',
    headers: { 'Content-Type': 'Application/json' },
    body: JSON.stringify({
      obj,
    })
  })
}

const fetchGetAllClients = async () => {
  const response = await fetch(`/clients`, {
    method: 'GET',
    headers: { 'Content-Type': 'Application/json' },
  })
  const clients = await response.json()
  return clients
}

const fetchGetDiscussions = async () => {
  const response = await fetch(`/discussions`, {
    method: 'GET',
    headers: { 'Content-Type': 'Application/json' },
  })
  const discussions = await response.json()

  return discussions
}

const fetchUpdateDiscussions = async (obj) => {
  await fetch(`/discussions/${obj.discussionId}/update-answers`, {
    method: 'PUT',
    headers: { 'Content-Type': 'Application/json' },
    body: JSON.stringify({
      obj,
    })
  })
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
  const category = yield call(fetchAddCategory(action.payload))
  yield put({ type: 'ADD_CATEGORY', payload: { category } })
}

function* getFetchAllCourses() {
  const courses = yield call(fetchAllCourses)
  yield put({ type: 'INIT_COURSES', payload: { courses } })
}

function* addFetchCourse(action) {
  yield call(fetchAddCourse, action.payload)
}

function* editFetchCourse(action) {
  yield call(fetchEditCourse, action.payload)
}

function* deleteFetchCourse(action) {
  yield call(fetchDeleteCourse, { id: action.payload.id })
}

function* getFetchCourseVideos() {
  const courseContentList = yield call(fetchCourseVideos)
  yield put({ type: 'INIT_COURSE_CONTENT_LIST', payload: { courseContentList } })
}

function* getFetchReview() {
  const reviews = yield call(fetchGetReviews)
  yield put({ type: 'INIT_REVIEWS', payload: { reviews } })
}

function* postSignUp(action) {
  const signup = yield call(fetchPostSignUp, action.payload)
  
  yield put({ type: 'SIGN_UP', payload: { signup } })
}

function* postSignIn(action) {
  const signin = yield call(fetchPostSignIn, action.payload)
  yield put({ type: 'SIGN_IN', payload: { signin } })
}

function* createCertificate(action) {
  yield call(fetchCreateCertificate, action.payload)
}

function* increaseCourseWatchers(action) {
  yield call(fetchIncreaseCourseWatchers, action.payload)
}

function* addReviewRating(action) {
  yield call(fetchAddReviewRating, action.payload)
}

function* getFetchAllClients(action) {
  const clients = yield call(fetchGetAllClients, action.payload)
  yield put({ type: 'INIT_CLIENTS', payload: { clients } })
}

function* getFetchDiscussions() {
  const discussions = yield call(fetchGetDiscussions)
  yield put({ type: 'INIT_DISCUSSIONS', payload: { discussions } })
}

function* updateFetchDiscussion(action) {
  yield call(fetchUpdateDiscussions, action.payload)
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

function* getViewedVideoProgressFetch(action) {
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
  yield takeEvery("GET_FETCH_REVIEW", getFetchReview);
  yield takeEvery("FETCH_SIGN_UP", postSignUp);
  yield takeEvery("FETCH_SIGN_IN", postSignIn);
  yield takeEvery("CREATE_CERTIFICATE", createCertificate);
  yield takeEvery("INCREAUSE_COURSE_WATCHERS_COUNT", increaseCourseWatchers)
  yield takeEvery("ADD_REVIEW_AND_RATING", addReviewRating)
  yield takeEvery("GET_FETCH_ALL_CLIENTS", getFetchAllClients)
  yield takeEvery("GET_FETCH_DISCUSSIONS", getFetchDiscussions)
  yield takeEvery("ADD_DISCUSSION_ANSWER", updateFetchDiscussion)
}

export default mySaga;
