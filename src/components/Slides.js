import React from "react";

import "../styles/Slides.css";
import * as Const from "../helpers/constants";

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
        />
      ))}
    </div>
  )
});

Slides.defaultProps = {
  type: Const.MAIN_TYPE,
  slides: [],
  clickHandler: () => {}
}

export default Slides;
