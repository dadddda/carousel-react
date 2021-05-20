import React from "react";

import "../styles/Slides.css";
import * as Const from "../helpers/constants";

import SlideContainer from "./SlideContainer";

const Slides = React.forwardRef(({
  type, 
  slidesArr, 
  clickHandler
}, ref) => {
  return (
    <div className="Slides" ref={ref}>
      {slidesArr.map(slideProps => (
        <SlideContainer 
          key={slideProps.id} 
          slideProps={slideProps}
          type={type}
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
