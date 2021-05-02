import React from "react";

import "../styles/Slides.css";
import * as K from "../helpers/constants";

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
          path={slide.path} 
          filename={slide.filename}
          clickHandler={clickHandler}
        ></Slide>
      ))}
    </div>
  )
});

Slides.defaultProps = {
  type: K.singleView,
  slides: [],
  clickHandler: () => {}
}

export default Slides;
