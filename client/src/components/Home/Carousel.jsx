import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import "./Carousel.css";
import { Link } from 'react-router-dom';

export const Carousel = ({ courses }) => {
  const categories = useSelector((state) => state.categoriesReducer.categories)
  console.log(categories, 'categories')
  const dispatch = useDispatch();
  useEffect(() => {dispatch({ type: 'GET_FETCH_CATEGORIES' })}, [dispatch])

  const slides = courses.map(course => ({
    src: course.picture,
    alt: `${course.name} for carousel`,
    name: course.name,
    id: course.id
  }));

  const [slide, setSlide] = useState(0);

  const nextSlide = () => {
    setSlide(slide === slides.length - 1 ? 0 : slide + 1);
  };

  const prevSlide = () => {
    setSlide(slide === 0 ? slides.length - 1 : slide - 1);
  };

  return (
    <div className="carousel">
      <BsArrowLeftCircleFill onClick={prevSlide} className="arrow arrow-left" />
      {slides.map((item, idx) => (
        <div key={idx} className={slide === idx ? "slide" : "slide slide-hidden"}>
          <img src={item.src} alt={item.alt} />
          <Link to={`/categories/:categoryname/${item.name}/${item.id}`}>
            <div className="overlay">{item.name}</div>
          </Link>
        </div>
      ))}
      <BsArrowRightCircleFill onClick={nextSlide} className="arrow arrow-right" />
    </div>
  );
};
