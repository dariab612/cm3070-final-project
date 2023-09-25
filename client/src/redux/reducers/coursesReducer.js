import { coursesAT } from '../actionTypes/coursesAT';

const coursesInitialState = {
  courses: {}
}

export const coursesReducer = (state = coursesInitialState, action) => {

  switch (action.type) {
    case coursesAT.INIT_COURSES:
      const courses = action.payload.courses
      console.log(action.payload)
      return { ...state, courses: courses };

    default:
      return state
  }

}
