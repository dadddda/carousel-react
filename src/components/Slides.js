import React from "react";

import "../styles/Slides.css";
import * as Const from "../helpers/constants";

import SlideContainer from "./SlideContainer";

const Slides = React.forwardRef(({
  type, 
  slidesArr, 
  slideTemplate,
  clickHandler
}, ref) => {
  return (
    <div className="Slides" ref={ref}>
      {slidesArr.map(slideProps => (
        <SlideContainer 
          key={slideProps.id} 
          type={type}
          slideProps={slideProps}
          slideTemplate={slideTemplate}
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
