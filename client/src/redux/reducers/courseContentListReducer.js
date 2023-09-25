import { courseContentListAT } from '../actionTypes/courseContentListAT';

const courseContentListInitialState = {
  courseContentList: {}
}

export const courseContentListReducer = (state = courseContentListInitialState, action) => {
  switch (action.type) {
    case courseContentListAT.INIT_COURSE_CONTENT_LIST:
      const courseContentList = action.payload.courseContentList
      return { ...state, courseContentList: courseContentList };
    default:
      return state
  }

}
