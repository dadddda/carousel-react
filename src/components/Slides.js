import React from "react";

import "../styles/Slides.css";
import * as Const from "../helpers/constants";

import Slide from "./Slide";

const Slides = React.forwardRef(({
  type, 
  slidesArr, 
  clickHandler
}, ref) => {
  return (
    <div className="Slides" ref={ref}>
      {slidesArr.map(slideProps => (
        <Slide 
          key={slideProps.id} 
          type={type}
          slideProps={slideProps}
          clickHandler={clickHandler}
        />
      ))}
    </div>
  )
});

Slides.defaultProps = {
  type: Const.MAIN_TYPE,
  slidesArr: [],
  clickHandler: () => {}
}

export default Slides;
