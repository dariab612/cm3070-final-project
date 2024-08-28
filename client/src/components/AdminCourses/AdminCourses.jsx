import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AdminCourseCard from './AdminCourseCard';
import { Link } from 'react-router-dom';
import AddModal from './AddModal';

import './AdminCourses.css';

function AdminCourses() {
  const courses = useSelector((state) => state.coursesReducer.courses)
  const dispatch = useDispatch()
  useEffect(() => {dispatch({ type: 'GET_FETCH_ALL_COURSES' })}, [dispatch])

  const [ addModal, setAddModal ] = useState(false)

  return (
    <>
      <h2>Courses</h2>
      <div className="admin-menu">
      <Link to="/adminreview">Reviews</Link>
        <Link to="/adminchangepass">Change Password</Link>
        <Link to="/admincategories">Admin Categories</Link>
        <Link to="/admincoursevideos">Admin Courses Content</Link>
      </div>
      <div className="courses-main-page">
       {courses.length? 
          courses.map(course => <AdminCourseCard id={course.id} name={course.name} picture={course.picture} categoryId={course.categoryId} description={course.description} />)
        : <p>No courses</p>}
      </div>
      <button onClick={() => setAddModal(!addModal)}>Add courses</button>
      { addModal && <AddModal/> }
    </>
  )
}

export default AdminCourses;
