import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import AdminCourseContentCard from './AdminCourseContentCard';
import AddModal from './AddModal';

function AdminCourseVideos() {
  const courseContentList = useSelector((state) => state.courseContentListReducer.courseContentList)
  const dispatch = useDispatch()
  useEffect(() => {dispatch({ type: 'GET_ALL_COURSE_VIDEOS' })}, [dispatch])
  console.log(courseContentList, 'courseContentList 4')

  const [ addModal, setAddModal ] = useState(false)
  return (
    <>
      <h2>Courses Content</h2>
      <div className="admin-menu">
         <Link to="/adminreview">Reviews</Link>
         <Link to="/adminchangepass">Change Password</Link>
         <Link to="/admincategories">Admin Categories</Link>
         <Link to="/admincourses">Admin Courses</Link>
      </div>
      <div className="course-videos-main-page">
        {courseContentList.length? 
        courseContentList.map(courseContent => <AdminCourseContentCard key={courseContent.id} id={courseContent.id} title={courseContent.title} link={courseContent.link} courseId={courseContent.courseId}/>)
        : <p>No course content</p>}
      </div>
      <button onClick={() => setAddModal(!addModal)}>Add Course Video</button>
      { addModal && <AddModal/> }
    </>
  )
}

export default AdminCourseVideos;
