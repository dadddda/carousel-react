import React from "react";

import "../styles/Slide.css";
import * as Const from "../helpers/constants";

const Slide = ({
  type, 
  id, 
  path,
  filename, 
  clickHandler
}) => {
  return (
    <div 
      className={"Slide " + type + ((id === 0) ? " " + Const.SELECTED_SLIDE : "")}
      id={id} 
      onClick={clickHandler}
    >
      <img src={path} alt={filename} draggable="false"></img>
    </div>
  )
}

Slide.defaultProps = {
  type: Const.MAIN_TYPE,
  id: "",
  path: "",
  filename: "",
  clickHandler: () => {}
}

export default Slide;
