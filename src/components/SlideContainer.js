import React from "react";

import "../styles/SlideContainer.css";
import * as Const from "../helpers/constants";

const SlideContainer = ({
  type, 
  slideProps,
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
      <img src={slideProps.path} alt={slideProps.filename} draggable="false"/>
    </div>
  )
}

SlideContainer.defaultProps = {
  type: Const.MAIN_TYPE,
  slideProps: {},
  clickHandler: () => {}
}

export default SlideContainer;
