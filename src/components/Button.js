import React from "react";

import "../styles/Button.css";
import * as K from "../helpers/constants";

const Button = ({pos, clickHandler}) => {
  return (
    <div className={"Button " + pos} onClick={clickHandler}>
      <span>&lt;</span>
    </div>
  );
}

Button.defaultProps = {
  pos: K.leftButton,
  clickHandler: () => {}
}

export default Button;
