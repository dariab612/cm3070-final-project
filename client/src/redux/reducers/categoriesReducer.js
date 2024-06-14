import { categoriesAT } from '../actionTypes/categoriesAT';

const categoriesInitialState = {
  categories: {}
}

export const categoriesReducer = (state = categoriesInitialState, action) => {

  switch (action.type) {
    case 'INIT_CATEGORIES':
      const categories = action.payload
      return { ...state, categories: categories };

    default:
      return state
  }

}
