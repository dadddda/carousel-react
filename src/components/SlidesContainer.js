import React from "react";

import "../styles/SlidesContainer.css";
import * as Const from "../helpers/constants";

import Slides from "./Slides";
import ButtonsContainer from "./ButtonsContainer";

const SlidesContainer = ({
  type, 
  slidesArr, 
  SlideTemplate,
  startActionHandler, 
  actionHandler, 
  stopActionHandler,
  clickHandler,
  slidesRef
}) => {
  return (
    <div 
      className={"SlidesContainer " + type} 
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
        slidesArr={slidesArr} 
        SlideTemplate={SlideTemplate}
        clickHandler={clickHandler}
        ref={slidesRef}
      />
      {
        type === Const.MAIN_TYPE 
          && <ButtonsContainer clickHandler={clickHandler}/>
      }
    </div>
  );
}

SlidesContainer.defaultProps = {
  type: Const.MAIN_TYPE,
  slidesArr: [],
  startActionHandler: () => {},
  actionHandler: () => {},
  stopActionHandler: () => {},
  clickHandler: () => {}
}

export default SlidesContainer;
