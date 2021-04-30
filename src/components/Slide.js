import React from "react";

import "../styles/Slide.css";

const Slide = ({type, title}) => {
  return (
    <div className={"Slide " + type}>
      <span>{title}</span>
    </div>
  )
}

Slide.defaultProps = {
  type: "single",
  title: "Slide"
}

export default Slide;
