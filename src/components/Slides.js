import React from "react";

import "../styles/Slides.css";

import Slide from "./Slide";

const Slides = React.forwardRef(({
  type, 
  slides, 
  clickHandler
}, ref) => {
  return (
    <div className="Slides" ref={ref}>
      {slides.map(slide => (
        <Slide 
          key={slide.id} 
          type={type} 
          id={slide.id} 
          title={slide.title} 
          clickHandler={clickHandler}
        ></Slide>
      ))}
    </div>
  )
});

Slides.defaultProps = {
  type: "single",
  slides: [],
  clickHandler: () => {}
}

export default Slides;
