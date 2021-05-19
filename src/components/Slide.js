import React from "react";

import "../styles/Slide.css";
import * as Const from "../helpers/constants";

const Slide = ({type, slideProps, slideTemplate}) => {
  const SlideTemplate = slideTemplate;

  return (
    <div className={"Slide " + type}>
      <SlideTemplate slideProps={slideProps}/>
    </div>
  )
}

Slide.defaultProps = {
  type: Const.MAIN_TYPE,
  slideProps: {}
}

export default Slide;
