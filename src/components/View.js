import React from "react";

import "../styles/View.css";
import * as K from "../helpers/constants";

import Slides from "./Slides";
import Buttons from "./Buttons";

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
      {
        type === K.singleView 
          ? <Buttons clickHandler={clickHandler}></Buttons> 
          : <></>
      }
    </div>
  );
}

View.defaultProps = {
  type: K.singleView,
  slides: [],
  startActionHandler: () => {},
  actionHandler: () => {},
  stopActionHandler: () => {},
  clickHandler: () => {}
}

export default View;
