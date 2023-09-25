import { courseContentListAT } from '../actionTypes/courseContentListAT'

export const mastersInitAC = (payload) => {
  return {
    type: courseContentListAT.INIT_COURSE_CONTENT_LIST,
    payload
  }
}
export const getFetchMastersAC = (payload) => {
  return {
    type: courseContentListAT.GET_FETCH_COURSE_CONTENT_LIST,
    payload
  }
}
