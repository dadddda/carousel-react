import React from "react";

import "../styles/SlideContainer.css";
import * as Const from "../helpers/constants";

import Slide from "./Slide";

const SlideContainer = ({
  type, 
  slideProps,
  slideTemplate,
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
      <Slide type={type} slideProps={slideProps} slideTemplate={slideTemplate}/>
    </div>
  )
}

SlideContainer.defaultProps = {
  type: Const.MAIN_TYPE,
  slideProps: {},
  clickHandler: () => {}
}

export default SlideContainer;
