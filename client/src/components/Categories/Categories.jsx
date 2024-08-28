import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Category from '../Category/Category';

import './Categories.css';

function Categories(props) {
  const categories = useSelector((state) => state.categoriesReducer.categories)
  const dispatch = useDispatch()
  useEffect(() => {dispatch({ type: 'GET_FETCH_CATEGORIES' })}, [dispatch])

  return (
      <div className="categories-block">
          <h2>&#10084; Course Categories &#10084;</h2>
          <div className="categories-main-page">
              {categories.length ? categories.map((category) => <Category key={category.id} category={category} />) : <p>No categories</p>}
          </div>
      </div>
  );
}

export default Categories;
