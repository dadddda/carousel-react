import React from "react";

import "../styles/View.css";

import Slides from "./Slides";

const View = ({
  type, 
  slides, 
  startActionHandler, 
  actionHandler, 
  stopActionHandler
}) => {
  return (
    <div 
      className={"View " + type} 
      onMouseDown={startActionHandler}
      onMouseMove={actionHandler}
      onMouseUp={stopActionHandler}
      onMouseLeave={stopActionHandler}
    >
      <Slides type={type} slides={slides}></Slides>
    </div>
  );
}

View.defaultProps = {
  type: "single",
  slides: [],
  startActionHandler: () => {},
  actionHandler: () => {},
  stopActionHandler: () => {}
}

export default View;
