import React from "react";

import "../styles/Slide.css";

const Slide = ({type, id, title, clickHandler}) => {
  return (
    <div className={"Slide " + type} id={id} onClick={clickHandler}>
      <span>{title}</span>
    </div>
  )
}

Slide.defaultProps = {
  type: "single",
  id: "",
  title: "Slide",
  clickHandler: () => {}
}

export default Slide;
