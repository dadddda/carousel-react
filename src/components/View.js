import React from "react";

import "../styles/View.css";

import Slides from "./Slides";

const View = ({type, slides}) => {
  return (
    <div className={"View " + type}>
      <Slides type={type} slides={slides}></Slides>
    </div>
  );
}

View.defaultProps = {
  type: "single",
  slides: []
}

export default View;
