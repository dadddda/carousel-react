import React from "react";

import "../styles/Slide.css";

const Slide = ({
  type, 
  id, 
  path,
  filename, 
  clickHandler
}) => {
  return (
    <div 
      className={"Slide " + type} 
      id={id} 
      onClick={clickHandler}
    >
      <img src={path} alt={filename} draggable="false"></img>
    </div>
  )
}

Slide.defaultProps = {
  type: "single",
  id: "",
  path: "",
  filename: "",
  clickHandler: () => {}
}

export default Slide;
