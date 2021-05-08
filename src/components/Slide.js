import React from "react";

import "../styles/Slide.css";
import * as Const from "../helpers/constants";

const Slide = ({type, slideProps}) => {
  return (
    <div className={"Slide " + type}>
      <img src={slideProps.path} alt={slideProps.filename} draggable="false"/>
    </div>
  )
}

Slide.defaultProps = {
  type: Const.MAIN_TYPE,
  slideProps: {}
}

export default Slide;
