import { combineReducers } from 'redux';
import { appReducer } from './appReducer';

import { categoriesReducer } from './categoriesReducer';
import reviewsReducer from './reviewsReducer';
import adminRegistrationReducer from './adminRegistrationReducer';
import adminFormReducer from './adminFormReducer'
import { coursesReducer } from './coursesReducer';
import { courseContentListReducer } from './courseContentListReducer';
import sessionReducer from './sessionReducer';
import signupReducer from './signupReducer';
import signinReducer from './signinReducer';
import cabinetReducer from './cabinetReducer'
import { viewedVideoProgressReducer } from './viewedVideoProgressReducer';
import { clientsReducer } from './clientsReducer';
import { discussionsReducer } from './discussionsReducer';

export const rootReducer = combineReducers({
  appReducer, 
  categoriesReducer,
  reviewsReducer,
  adminRegistrationReducer,
  adminFormReducer,
  coursesReducer, 
  courseContentListReducer, 
  sessionReducer, 
  signupReducer, 
  signinReducer,
  cabinetReducer,
  viewedVideoProgressReducer,
  clientsReducer,
  discussionsReducer,
});
