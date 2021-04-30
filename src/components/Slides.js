import React from "react";

import "../styles/Slides.css";

import Slide from "./Slide";

const Slides = ({type, slides}) => {
  return (
    <div className="Slides">
      {slides.map(slide => (
        <Slide type={type} key={slide.id} title={slide.title}></Slide>
      ))}
    </div>
  )
}

Slides.defaultProps = {
  type: "single",
  slides: []
}

export default Slides;
