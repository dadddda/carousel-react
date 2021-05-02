import React from "react";

import "../styles/View.css";

import Slides from "./Slides";

const View = ({
  type, 
  slides, 
  startActionHandler, 
  actionHandler, 
  stopActionHandler,
  clickHandler,
  slidesRef
}) => {
  return (
    <div 
      className={"View " + type} 
      onMouseDown={startActionHandler}
      onMouseMove={actionHandler}
      onMouseUp={stopActionHandler}
      onMouseLeave={stopActionHandler}

      onTouchStart={startActionHandler}
      onTouchMove={actionHandler}
      onTouchEnd={stopActionHandler}
      onTouchCancel={stopActionHandler}
    >
      <Slides 
        type={type} 
        slides={slides} 
        clickHandler={clickHandler}
        ref={slidesRef}
      ></Slides>
    </div>
  );
}

View.defaultProps = {
  type: "single",
  slides: [],
  startActionHandler: () => {},
  actionHandler: () => {},
  stopActionHandler: () => {},
  clickHandler: () => {}
}

export default View;
