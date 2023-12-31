import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Nav from './components/Nav/Nav.jsx'
import Home from "./components/Home/Home.jsx";
import Categories from "./components/Categories/Categories.jsx";
import CourseList from "./components/CourseList/CourseList"
import CourseContentList from "./components/CourseContentList/CourseContentList"
import SignUp from "./components/SignUp/SignUp"
import SignIn from "./components/SignIn/SignIn"
import Profile from "./components/Profile/Profile"
import Review from "./components/Review/Review.jsx"
import Admin from "./components/AdminForm/AdminForm.jsx"
import AdminCabinet from "./components/AdminCabinet/AdminCabinet.jsx";
import Donation from "./components/Donation/Donation.jsx";
import AdminReview from './components/AdminReview/AdminReview.jsx';
import AdminChangePass from './components/AdminChangePass/AdminChangePass.jsx';
import About from "./components/About/About.jsx"
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'SESSION_FETCH' })
  })


  return (
    <BrowserRouter>
      <Nav />

      <Switch>

        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/about">
          <About />
        </Route>

        <Route exact path="/reviews">
          <Review />
        </Route>

        <Route exact path="/categories">
          <Categories />
        </Route>

        <Route exact path="/categories/:categoryname/:id">
          <CourseList />
        </Route>

        <Route exact path="/categories/:categoryname/:course/:id">
          <CourseContentList />
        </Route>

        <Route exact path="/profile">
          <Profile />
        </Route>

        <Route exact path="/donation">
          <Donation />
        </Route>

        <Route exact path="/signup">
          <SignUp />
        </Route>

        <Route exact path="/signin">
          <SignIn />
        </Route>

        <Route exact path="/adminform">
          <Admin />
        </Route>

        <Route exact path="/admincabinet">
          <AdminCabinet />
        </Route>

        <Route exact path="/adminreview">
          <AdminReview />
        </Route>

        <Route exact path="/adminchangepass">
          <AdminChangePass />
        </Route>

      </Switch>

    </BrowserRouter>
  );
}

export default App;
