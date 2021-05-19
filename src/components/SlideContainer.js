import React from "react";

import "../styles/SlideContainer.css";
import * as Const from "../helpers/constants";

import Slide from "./Slide";

const SlideContainer = ({
  type, 
  slideProps,
  SlideTemplate,
  clickHandler
}) => {
  return (
    <div 
      className={
        "SlideContainer " + type + ((slideProps.id === 0) 
          ? " " + Const.SELECTED_SLIDE
          : "")
      }
      id={slideProps.id} 
      onClick={clickHandler}
    >
      <Slide type={type} slideProps={slideProps} SlideTemplate={SlideTemplate}/>
    </div>
  )
}

SlideContainer.defaultProps = {
  type: Const.MAIN_TYPE,
  slideProps: {},
  clickHandler: () => {}
}

export default SlideContainer;
