import React from "react";

import "../styles/Slide.css";
import * as Const from "../helpers/constants";

const Slide = ({slideElem, type}) => {
  return (
    <div className={"Slide " + type}>
      {slideElem}
    </div>
  )
}

Slide.defaultProps = {
  slideElem: <></>,
  type: Const.MAIN_TYPE
}

export default Slide;
