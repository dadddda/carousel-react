import React from "react";

import "../styles/SlideContainer.css";
import * as Const from "../helpers/constants";

import Slide from "./Slide";

const SlideContainer = ({
  slideProps,
  type, 
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
      <Slide slideElem={slideProps.elem} type={type}/>
    </div>
  )
}

SlideContainer.defaultProps = {
  slideProps: {},
  type: Const.MAIN_TYPE,
  clickHandler: () => {}
}

export default SlideContainer;
