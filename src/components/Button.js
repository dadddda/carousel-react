import React from "react";

import "../styles/Button.css";

const Button = ({pos, clickHandler}) => {
  return (
    <div className={"Button " + pos} onClick={clickHandler}>
      <span>&lt;</span>
    </div>
  );
}

Button.defaultProps = {
  pos: "left",
  clickHandler: () => {}
}

export default Button;
