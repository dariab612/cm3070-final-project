import { coursesAT } from '../actionTypes/coursesAT'

export const coursesInitAC = (payload) => {
  return {
    type: coursesAT.INIT_COURSES,
    payload
  }
}
export const gettFetchCoursesAC = (payload) => {
  return {
    type: coursesAT.GET_FETCH_COURSES,
    payload
  }
}
