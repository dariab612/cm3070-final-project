import React, { useEffect,useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import AdminCategoryCard from './AdminCategoryCard';
import AddModal from './AddModal';

import './AdminCategories.css';

function AdminCategories(props) {
  const categories = useSelector((state) => state.categoriesReducer.categories)
  const dispatch = useDispatch()
  useEffect(() => {dispatch({ type: 'GET_FETCH_CATEGORIES' })}, [dispatch])
  const [ addModal, setAddModal ] = useState(false)
  console.log(categories, 'categories')
  return (
    <div>
   <>
   <h2>Categories</h2>
   <div className="admin-menu">
     <Link to="/adminreview">Reviews</Link>
     <Link to="/adminchangepass">Change Password</Link>
     <Link to="/admincourses">Admin Courses</Link>
   </div>
   <div className="categories-main-page">
      {categories.length? 
      categories.map(category => <AdminCategoryCard id={category.id} name={category.name} picture={category.picture} />)
    : <p>No categories</p>}
   </div>
   <button onClick={() => setAddModal(!addModal)}>Add category</button>
   { addModal && <AddModal/> }
   </>
 </div>
  )
}

export default AdminCategories;
