import React from "react";

import "../styles/Slide.css";
import * as K from "../helpers/constants";

const Slide = ({
  type, 
  id, 
  path,
  filename, 
  clickHandler
}) => {
  return (
    <div 
      className={"Slide " + type + ((id === 0) ? " " + K.selectedSlide : "")}
      id={id} 
      onClick={clickHandler}
    >
      <img src={path} alt={filename} draggable="false"></img>
    </div>
  )
}

Slide.defaultProps = {
  type: K.singleView,
  id: "",
  path: "",
  filename: "",
  clickHandler: () => {}
}

export default Slide;
