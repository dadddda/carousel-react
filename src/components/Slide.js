import React from "react";

import "../styles/Slide.css";
import * as Const from "../helpers/constants";

const Slide = ({
  type, 
  slideProps,
  clickHandler
}) => {
  return (
    <div 
      className={
        "Slide " + type + ((slideProps.id === 0) 
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

Slide.defaultProps = {
  type: Const.MAIN_TYPE,
  slideProps: {},
  clickHandler: () => {}
}

export default Slide;
