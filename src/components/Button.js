import React from "react";

import "../styles/Button.css";
import * as Const from "../helpers/constants";

const Button = ({type, clickHandler}) => {
  return (
    <div className={"Button " + type} onClick={clickHandler}>
      <span>&lt;</span>
    </div>
  );
}

Button.defaultProps = {
  type: Const.LEFT_BUTTON,
  clickHandler: () => {}
}

export default Button;
